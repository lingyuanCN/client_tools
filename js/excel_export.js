const XLSX = require('xlsx')
const fs = require('fs')

const DEBUG = false // 打包时需要改成false
// debug 命令 ./node_modules/.bin/electron .
// 打包命令 npm run package

const TEMPLATE_PATH = __dirname + '/../tools/excel_export/template/template.txt'
const desktopPath = require('path').join(require('os').homedir(), 'Desktop')
const CLIENT_RESULT_PATH = desktopPath + '/client/'
const SERVER_RESULT_PATH = desktopPath + '/server/'
const DELIMITER = '#FS#'

const CRLF_EOL = '\r\n'
// const LF_EOL = '\n'

let totalFileNum = 0

const CSVToArray = (data, delimiter = DELIMITER, omitFirstRow = false) =>
    data
        .slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
        .split('\n')
        .map(v => v.split(delimiter))

const ROW_MAP = {
    VALUE_TYPE: 0,
    KEY_DESC: 1,
    SERVER_CLIENT: 2,
    KEY_NAME: 3,
    VALUE_START: 4,
}

const KEY_TYPE = {
    SERVER: 'Server',
    CLIENT: 'Client',
    BOTH: 'Both',
}

const SHEET_INDEX = 1

let dragArea = document.getElementById('excel-drag-area')
//拖进
dragArea.addEventListener(
    'dragenter',
    function(e) {
        e.preventDefault()
    },
    false
)

//拖离
dragArea.addEventListener(
    'dragleave',
    function(e) {
        e.preventDefault()
    },
    false
)

//一定要注意dragover事件一定要清除默认事件
//不然会无法触发后面的drop事件
dragArea.addEventListener(
    'dragover',
    function(e) {
        e.preventDefault()
    },
    false
)

//拖动区域内释放
dragArea.addEventListener(
    'drop',
    function(e) {
        dropHandler(e)
    },
    false
)

let dropHandler = function(e) {
    e.preventDefault()

    let fileList = e.dataTransfer.files

    // 检测是否是拖拽文件到页面的操作
    if (fileList.length === 0) {
        return
    }

    let template = null
    if (DEBUG) {
        template = readLocalFileSync(__dirname + '/tools/excel_export/template/template.txt')
    } else {
        template = readLocalFileSync(TEMPLATE_PATH)
    }
    totalFileNum = 2 * fileList.length
    for (let i = 0; i < fileList.length; i++) {
        let file = fileList[i]
        processExcelFile(file, template)
    }
}

function processExcelFile(file, template) {
    readWorkbookFromLocalFile(file, function(workbook){
        formatWorkbookDataToLua(workbook, file, template)
        formatWorkbookDataToXml(workbook, file)
    })
}

function readWorkbookFromLocalFile(file, callback) {
	let reader = new FileReader()
	reader.onload = function(e) {
		let data = e.target.result
		let workbook = XLSX.read(data, {type: 'binary'})
		if(callback) callback(workbook)
	}
	reader.readAsBinaryString(file)
}

function formatWorkbookDataToLua(workbook, file, template) {
    // 替换模板中的文件名
    let fullFileName = (file.name).toString()
    let fileName = fullFileName.match(/.*(?=\.)/g)[0]
    let luaContent = template.replace(/#cfg_name#/g, fileName)

    let sheetNames = workbook.SheetNames
    let worksheet = workbook.Sheets[sheetNames[SHEET_INDEX - 1]]

    let a1 = worksheet['A1'].v
    let keyList = a1.split(',')

    // TODO validate sheet correction

    let csv = XLSX.utils.sheet_to_csv(worksheet, {FS: DELIMITER, rawNumbers: true})
    // console.log(csv)
    let sheetArray = CSVToArray(csv, DELIMITER, true) // excel表sheet的二维数组 忽略第一行（第一行表示该表的uniquekey）

    let valueTypeList = sheetArray[ROW_MAP.VALUE_TYPE]
    let keyDescList = sheetArray[ROW_MAP.KEY_DESC]
    let isServerClientList = sheetArray[ROW_MAP.SERVER_CLIENT]
    let keyNameList = sheetArray[ROW_MAP.KEY_NAME]

    // 替换字段名
    // 替换字段索引
    let allKeyInfo = ''
    let keyMap = ''
    let keyIndexMap = {}
    let keyIndex = 1
    for (let i = 0; i < keyNameList.length; i++) {
        let isServerClient = isServerClientList[i]
        const curKey = keyNameList[i]
        if (isServerClient == KEY_TYPE.CLIENT || isServerClient == KEY_TYPE.BOTH) {
            let defaultValue = valueTypeList[i] == 'int' || valueTypeList[i] == 'int64' ? '0' : '\"\"' 
            let keyInfo = 'record_' + fileName + '.' + curKey + ' = ' + defaultValue + ' -- ' + keyDescList[i]
            allKeyInfo += keyInfo + CRLF_EOL

            keyMap += '    ' + curKey + ' = ' + keyIndex + ',' + CRLF_EOL
            keyIndex += 1
        }
        for (let index = 0; index < keyList.length; index++) {
            const key = keyList[index];
            if (curKey == key) {
                keyIndexMap[i] = true
            }
        }
    }
    luaContent = luaContent.replace(/#cfg_all_keys#/g, allKeyInfo)
    luaContent = luaContent.replace(/#key_map#/g, keyMap)

    // 替换所有数据
    let allCfgData = ''
    for (let row = ROW_MAP.VALUE_START; row < sheetArray.length; row++) {
        const rowInfo = sheetArray[row];
        if (rowInfo[0] == '') {
            break
        }

        let cfgData = '    [' + (row - ROW_MAP.VALUE_START + 1) + '] = {'
        for (let i = 0; i < rowInfo.length; i++) {
            const data = rowInfo[i];
            let value = data
            if (value == '') {
                value = valueTypeList[i] == 'int' ? '0' : '\"\"'
            } else if (valueTypeList[i] == 'string') {
                value = '\"' + value + '\"'
            }

            let isServerClient = isServerClientList[i]
            if (isServerClient == KEY_TYPE.CLIENT || isServerClient == KEY_TYPE.BOTH) {
                cfgData += value + ','
            }
        }
        
        allCfgData += cfgData + '},' + CRLF_EOL
    }
    luaContent = luaContent.replace(/#cfg_all_data#/g, allCfgData)

    // 替换key相关
    let keyGroup = ''
    let keyParams = ''
    let uniqueKeyLink = ''
    for (let i = 0; i < keyList.length; i++) {
        const key = keyList[i];
        keyGroup += key
        keyParams += key
        uniqueKeyLink += key
        if (i != keyList.length - 1) {
            keyGroup += '_'
            keyParams += ', '
            uniqueKeyLink += ' .. _ .. '
        }
    }
    luaContent = luaContent.replace(/#unique_key_group#/g, keyGroup)
    luaContent = luaContent.replace(/#key_params#/g, keyParams)
    luaContent = luaContent.replace(/#unique_key_link#/g, uniqueKeyLink)

    // 替换反向索引
    let keyReverseIndex = ''
    for (let row = ROW_MAP.VALUE_START; row < sheetArray.length; row++) {
        const rowInfo = sheetArray[row];
        if (rowInfo[0] == '') {
            break
        }
        let keyGroupValue = ''
        let isString = false
        for (let i = 0; i < rowInfo.length; i++) {
            if (keyIndexMap[i]) {
                const data = rowInfo[i];
                if (keyGroupValue != '') {
                    keyGroupValue += '_' + data
                    isString = true
                } else {
                    keyGroupValue = data
                }
            }
        }
        if (isString) {
            keyGroupValue = '\"' + keyGroupValue + '\"'
        }

        keyReverseIndex += '    [' + keyGroupValue + '] = ' + (row - ROW_MAP.VALUE_START + 1) + ',' + CRLF_EOL
    }
    luaContent = luaContent.replace(/#key_reverse_index#/g, keyReverseIndex)

    if (DEBUG) {
        console.log(luaContent)
    }
    saveFile(CLIENT_RESULT_PATH, fileName + '.lua', luaContent)
}

function formatWorkbookDataToXml(workbook, file) {
    // 替换模板中的文件名
    let fullFileName = (file.name).toString()
    let fileName = fullFileName.match(/.*(?=\.)/g)[0]
    let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>' + CRLF_EOL

    let sheetNames = workbook.SheetNames
    let worksheet = workbook.Sheets[sheetNames[SHEET_INDEX - 1]]

    let a1 = worksheet['A1'].v

    // TODO validate sheet correction

    let csv = XLSX.utils.sheet_to_csv(worksheet, {FS: DELIMITER, rawNumbers: true})
    // console.log(csv)
    let sheetArray = CSVToArray(csv, DELIMITER, true) // excel表sheet的二维数组 忽略第一行（第一行表示该表的uniquekey）

    let valueTypeList = sheetArray[ROW_MAP.VALUE_TYPE]
    let keyDescList = sheetArray[ROW_MAP.KEY_DESC]
    let isServerClientList = sheetArray[ROW_MAP.SERVER_CLIENT]
    let keyNameList = sheetArray[ROW_MAP.KEY_NAME]

    // 替换字段索引
    xmlContent += '<!-- '
    for (let i = 0; i < keyNameList.length; i++) {
        let isServerClient = isServerClientList[i]
        const curKey = keyNameList[i]
        if (isServerClient == KEY_TYPE.SERVER || isServerClient == KEY_TYPE.BOTH) {
            let defaultValue = valueTypeList[i] == 'int' || valueTypeList[i] == 'int64' ? '0' : '\"\"' 
            let keyInfo = curKey + '=' + keyDescList[i] + ' '
            xmlContent += keyInfo
        }
    }
    xmlContent = xmlContent + '-->' + CRLF_EOL + '<root>' + CRLF_EOL

    // 替换所有数据
    for (let row = ROW_MAP.VALUE_START; row < sheetArray.length; row++) {
        const rowInfo = sheetArray[row];
        if (rowInfo[0] == '') {
            break
        }

        xmlContent += '    <data '
        for (let i = 0; i < rowInfo.length; i++) {
            let isServerClient = isServerClientList[i]
            if (isServerClient == KEY_TYPE.SERVER || isServerClient == KEY_TYPE.BOTH) {
                const curKey = keyNameList[i]
                const data = rowInfo[i];
                let value = data
                value = '\"' + value + '\"'
                xmlContent += curKey + '=' + value + ' '
            }
        }
        xmlContent += ' />' + CRLF_EOL
    }

    xmlContent += '</root>'


    if (DEBUG) {
        console.log(xmlContent)
    }
    saveFile(SERVER_RESULT_PATH, fileName + '.xml', xmlContent)
}

// 异步读取
function readLocalFile(path, callback) {
    fs.readFile(path, function(err, data) {
        if (err) {
            throw err
        }
        else{
            if (callback) {
                callback(data)
            }
        }
    })
}

// 同步读取
function readLocalFileSync(path) {
    let data = fs.readFileSync(path, function(err) {
        if (err) {
            throw err
        }
    })
    return data.toString()
}

// 保存文件
function saveFile(path, fileName, content) {
    fs.mkdir(path, function(error){
        fs.writeFile(path + fileName, content,  function(error) {
            if (error) {
                return console.error(error)
            }
            totalFileNum -= 1
            if (totalFileNum <= 0) {
                alert("finish")
            }
        })
        if(error){
            return console.error(error)
        }
    })
}
