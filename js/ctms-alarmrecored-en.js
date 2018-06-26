require.config({
  paths: {
    "index":"./ctms-index"
    ,"layui":"../layui/layui"
    ,"table":"./ctms-alarmrecored-table"
  },
  shim:{
    "table":['layui']
  }
});
require(['index','table'])
