const ExcelJS = require('exceljs')

let dragArea = document.getElementById('excel-drag-area')
//拖进
dragArea.addEventListener(
    "dragenter",
    function(e) {
        e.preventDefault();
    },
    false
);

//拖离
dragArea.addEventListener(
    "dragleave",
    function(e) {
        e.preventDefault();
    },
    false
);

//一定要注意dragover事件一定要清除默认事件
//不然会无法触发后面的drop事件
dragArea.addEventListener(
    "dragover",
    function(e) {
        e.preventDefault();
    },
    false
);

//拖动区域内释放
dragArea.addEventListener(
    "drop",
    function(e) {
        dropHandler(e);
    },
    false
);

let dropHandler = function(e) {
    e.preventDefault();

    let fileList = e.dataTransfer.files;
    let fileNum = fileList.length;

    // 检测是否是拖拽文件到页面的操作
    if (fileList.length === 0) {
        return;
    }
    let file = fileList[0];

    console.time();
    let reader = new FileReader();
    reader.onloadend = function(event) {
        let arrayBuffer = reader.result;
    
        let workbook = new ExcelJS.Workbook();
        workbook.xlsx.load(arrayBuffer).then(function(workbook) {
            console.timeEnd();
            let result = ''
            console.log(workbook)
            workbook.worksheets.forEach(function (sheet) {
            sheet.eachRow(function (row, rowNumber) {
                result += row.values + ' | \n'
            })
            })
            console.log(result)
        });
    };
    reader.readAsArrayBuffer(file);
};