# doutool

*api*

图片地址  http://api.toysmodel.cn/Inf/UpLoad/201906/09/16310.jpg

获取列表 http://api.toysmodel.cn/Shop/index.php?s=/App/get_product_list
body {
  area_id: 1 (1 五亭龙)
  page: 0
  pagesize: 20
  type: 1
}

搜索资源图片
http://api.toysmodel.cn/toyN1.php?function=PicQuerySumDB&v1=+and+((AreaID%3D1)+or+(AreaID%3D3))+and+(PID%3D0)+and+(CONCAT(PName%2CTag%2CToySn%2CSName)+like+'%25%25')+and+(CONCAT(PName%2CTag%2CToySn%2CSName)+like+'%251605254002%25')+Order+by+ID+desc++LIMIT+0%2C21

图片列表
http://api.toysmodel.cn/toyN1.php?function=PicQueryDB&v1=+and+((PID%3D380394)+or+(ID%3D380394))+Order+by+ID+DESC+LIMIT+30%2C31