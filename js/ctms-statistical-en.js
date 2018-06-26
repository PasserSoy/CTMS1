require.config({
  paths: {
    "index":"./ctms-index"
    ,"layui":"../layui/layui"
    ,"table":"./ctms-statistical-table"
    ,"chart":"./ctms-statistical-chart"
  },
  shim:{
    "table":['layui']
  }
});
require(['index','table','chart'],function(){
  //页面切换
  var _id = $('[data-page].active').data('page');
  $('.page').css('z-index','-1');
  $('#'+_id).css('z-index','9');
  $('[data-page]').on('click',function(){
    $(this).addClass('active').siblings('[data-page]').removeClass('active');
    var _id = $(this).data('page');
    $('.page').css('z-index','-1');
    $('#'+_id).css('z-index','9');
  })
})
