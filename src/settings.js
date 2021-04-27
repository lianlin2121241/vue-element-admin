module.exports = {
  title: 'Vue Element Admin',

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production',
  /**
   * 字典值
   * bedroomOriented	主卧朝向
   * buildingType	建筑类型
   * decorationStatus	装修情况
   * feeDetail	费用明细
   * heating	供暖
   * houseStructure	户型结构
   * houseTypes	房屋类型
   * houseYearLimit	房屋年限
   * priceMode	付款方式
   * propertyTypes	产权类型
   * propertyYears	产权年限
   * publicFacilities	公共设施
   * relatedFacilities	房间设施
   * roomMode	卧室类型
   * sex	性别
   * visitTime	看房时间
   */
  dictTypes:[
    'bedroomOriented',
    'buildingType',
    'decorationStatus',
    'feeDetail',
    'heating',
    'houseStructure',
    'houseTypes',
    'houseYearLimit',
    'priceMode',
    'propertyTypes',
    'propertyYears',
    'publicFacilities',
    'relatedFacilities',
    'roomMode',
    'sex',
    'visitTime'
  ]
}
