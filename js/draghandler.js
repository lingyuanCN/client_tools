const XLSX = require('xlsx')
const fs = require('fs')

const TEMPLATE_PATH = './tools/excel_export/template/template.txt'

const CSVToArray = (data, delimiter = ',', omitFirstRow = false) =>
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

    for (let i = 0; i < fileList.length; i++) {
        let file = fileList[i]
        processExcelFile(file)
    }
}

function processExcelFile(file) {
    let template = readLocalFileSync(TEMPLATE_PATH)

    readWorkbookFromLocalFile(file, function(workbook){
        formatWorkbookData(workbook, file, template)
    })

}

function readWorkbookFromLocalFile(file, callback) {
	let reader = new FileReader()
	reader.onload = function(e) {
        console.log(e)
		let data = e.target.result
		let workbook = XLSX.read(data, {type: 'binary'})
		if(callback) callback(workbook)
	}
	reader.readAsBinaryString(file)
}

function formatWorkbookData(workbook, file, template) {
    // 替换模板中的文件名
    let fullFileName = (file.name).toString()
    let fileName = fullFileName.match(/.*(?=\.)/g)[0]
    template = template.replace(/#cfg_name#/g, fileName)
    console.log(template)

    let sheetNames = workbook.SheetNames
    let worksheet = workbook.Sheets[sheetNames[SHEET_INDEX - 1]]

    let a1 = worksheet['A1'].v
    let keyList = a1.split(',')
    console.log(keyList)

    // TODO validate sheet correction

    let csv = XLSX.utils.sheet_to_csv(worksheet)
    let sheetArray = CSVToArray(csv, ',', true) // excel表sheet的二维数组 忽略第一行（第一行表示该表的uniquekey）
    console.log(sheetArray)

    let valueTypeList = sheetArray[ROW_MAP.VALUE_TYPE]
    let keyDescList = sheetArray[ROW_MAP.KEY_DESC]
    let isServerClientList = sheetArray[ROW_MAP.SERVER_CLIENT]
    let keyNameList = sheetArray[ROW_MAP.KEY_NAME]

    let allKeyInfo = ''
    for (let i = 0; i < keyNameList.length; i++) {
        let isServerClient = isServerClientList[i]
        if (isServerClient == KEY_TYPE.CLIENT || isServerClient == KEY_TYPE.BOTH) {
            console.log(valueTypeList[i])
            let defaultValue = valueTypeList[i] == 'int' ? '0' : '\"\"' 
            let keyInfo = 'record_' + fileName + '.' + keyNameList[i] + ' = ' + defaultValue + ' -- ' + keyDescList[i]
            allKeyInfo += keyInfo + '\n'
        }
    }
    template = template.replace(/#cfg_all_keys#/g, allKeyInfo)
    console.log(template)
}

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

function convertToLuaFile() {

}

function saveFile(path, content) {
    
}
