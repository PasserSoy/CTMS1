require.config({
  paths: {
    "index":"./ctms-index"
    ,"layui":"../layui/layui"
    ,"table":"./ctms-alarmout-table"
  },
  shim:{
    "table":['layui']
  }
});
require(['index','table'],function(){
  // 显示导出页
  $('body').on('click','.toexcel',function(){
    $('.excel').show(0);
  });
  // 隐藏导出页
  $('body').on('click','.toback',function(){
    $('.excel').hide(0);
  });
})
