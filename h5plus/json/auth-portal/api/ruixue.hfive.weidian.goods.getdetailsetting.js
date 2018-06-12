{
  "hfive_weidian_goods_getdetailsetting_response": {
    "product_id": 1,
    "category_name": "服装",
    "name": "商品A",
    "images": [
      {
        "image": "http://aaa.bbb.ccc/ddd/goods1.jpg"
      },
      {
        "image": "http://aaa.bbb.ccc/ddd/goods2.jpg"
      }
    ],
    "info": "<p>商品描述</p>",
    "price": 100,
    "properties": [
      {
        "pid": 1,
        "pname": "尺寸",
        "values": [
          {
            "vid": 1,
            "value": "2米1",
            "image": "http://oss-cn-hangzhou.aliyuncs.com/h5plus/mts/pic/IMG_20160213_102107.jpg"
          },
          {
            "vid": 2,
            "value": "三米",
            "image": "http://oss-cn-hangzhou.aliyuncs.com/h5plus/mts/pic/IMG_20160213_102107.jpg"
          }
        ]
      },
      {
        "pid": 2,
        "pname": "重量",
        "values": [
          {
            "vid": 1,
            "value": "30千克",
            "image": "http://oss-cn-hangzhou.aliyuncs.com/h5plus/mts/pic/IMG_20160213_102107.jpg"
          },
          {
            "vid": 2,
            "value": "1千克",
            "image": "http://oss-cn-hangzhou.aliyuncs.com/h5plus/mts/pic/IMG_20160213_102107.jpg"
          }
        ]
      }
    ],
    "skus": {
      "pid": 1,
      "pname": "尺寸",
      "values": [
        {
          "vid": 1,
          "value": "2米1",
          "next": {
            "pid": 2,
            "pname": "重量",
            "values": [
              {
                "vid": 1,
                "value": "10斤",
                "price": 100,
                "quantity": 10
              },
              {
                "vid": 2,
                "value": "20斤",
                "price": 200,
                "quantity": 20
              }
            ]
          }
        },
        {
          "vid": 2,
          "value": "三米",
          "next": {
            "pid": 2,
            "pname": "重量",
            "values": [
              {
                "vid": 1,
                "value": "5吨",
                "price": 12,
                "quantity": 20
              },
              {
                "vid": 2,
                "value": "6吨",
                "price": 13,
                "quantity": 23
              }
            ]
          }
        }
      ]
    }
  }
}