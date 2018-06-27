layui.use(['layer','form','table','laydate'], function(){
  var $ = layui.jquery,layer = layui.layer,form = layui.form,table = layui.table,laydate = layui.laydate;
  //日期时间范围
  laydate.render({
    elem: '#chooseTime'
    ,type: 'datetime'
    ,range: '到'
    ,format: 'yyyy/MM/dd HH:mm'
  });
	//自定义皮肤
	layer.config({
	  extend: '/myskin/style.css', 
	  skin: 'layer-ext-myskin'
	});
});
/**导出Excel **/
$(function(){
  var mytable = $('.mytablediv').html();
  mytable = `
  <html> <head><meta charset="UTF-8">
    <style>
    table{ border-collapse: collapse;font-family: 'microsoft yahei';border-spacing: 0;font-size: 12px;} table thead tr {background-color: #ea5504; color: #fff;} caption,.cap{height: 40px;line-height: 40px;font-size: 16px;;background-color: red;} table td, table th{padding: 0 15px;font-size: 14px;text-align: center;height: 40px;line-height: 40px;border: 1px solid #000;} table td {text-align: left;}
    </style>
    </head> <body>
    ${mytable}
    </body> </html>
  `;
  var excelBlob = new Blob([mytable], {type: 'application/vnd.ms-excel'});
  var down = $('.export');
  down.attr({'href':URL.createObjectURL(excelBlob),'download':'mytable.xls'})
})
