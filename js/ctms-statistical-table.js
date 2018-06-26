var Myport = 'http://localhost/zwp/measurtemper/data/';// 要改
layui.use(['layer','form','table','laydate'], function(){
  var $ = layui.jquery,layer = layui.layer,form = layui.form,table = layui.table,laydate = layui.laydate;
  // 提交表单，要改
  form.on('submit(*)', function(data){
    //console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
    //console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
    console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
    $.ajax({
      url:Myport+'getDataListAll',//接口地址
      dataType: "json",
      data:data.field,//传参
      success:function(data){ // 请求成功返回的数据
        if(data.success){
          console.log(data)
          //table.reload('testReload');// 成功后刷新表格
        }else {
          layer.alert('失败')
        }
      }
    })// 表单提交结束
    return false;//阻止表单跳转。如果需要表单跳转，去掉这段即可。
  });
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
})