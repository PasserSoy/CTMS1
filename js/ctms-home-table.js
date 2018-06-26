var Myport = 'http://localhost/zwp/measurtemper/data/';
layui.use(['layer','form','table','laydate'], function(){
  var $ = layui.jquery,layer = layui.layer,form = layui.form,table = layui.table,laydate = layui.laydate;
  // 表单
  table.render({
    elem: '#mytable'
    ,height: 325
    ,id:'testReload'
    ,url:Myport+'GetAllPointCurData' //数据接口 
    ,page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
      layout: ['limit', 'prev',  'skip',  'next','count'] //自定义分页布局
      //,curr: 5 //设定初始在第 5 页
      ,groups: 1 //只显示 1 个连续页码
      ,first: false //不显示首页
      ,last: false //不显示尾页
    }
    ,cols: [[ //表头
       {field: 'group_name', title: '群名称',align:'center'}
      ,{field: 'term_name', title: '组名称',align:'center'}
      ,{field: 'point_name', title: '监测点名称',align:'center'}
      ,{field: 'temper', title: '当前温度(℃)',align:'center'}
    ]]
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
});
