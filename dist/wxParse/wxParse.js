'use strict';

var _showdown = require('./showdown.js');

var _showdown2 = _interopRequireDefault(_showdown);

var _html2json = require('./html2json.js');

var _html2json2 = _interopRequireDefault(_html2json);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * author: Di (微信小程序开发工程师)
                                                                                                                                                                                                                   * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
                                                                                                                                                                                                                   *               垂直微信小程序开发交流社区
                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                   * github地址: https://github.com/icindy/wxParse
                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                   * for: 微信小程序富文本解析
                                                                                                                                                                                                                   * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
                                                                                                                                                                                                                   */

/**
 * utils函数引入
 **/


/**
 * 配置及公有属性
 **/
var realWindowWidth = 0;
var realWindowHeight = 0;
wx.getSystemInfo({
  success: function success(res) {
    realWindowWidth = res.windowWidth;
    realWindowHeight = res.windowHeight;
  }
});
/**
 * 主函数入口区
 **/
function wxParse() {
  var bindName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'wxParseData';
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'html';
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '<div class="color:red;">数据不能为空</div>';
  var target = arguments[3];
  var imagePadding = arguments[4];

  var that = target;
  var transData = {}; //存放转化后的数据
  if (type == 'html') {
    transData = _html2json2.default.html2json(data, bindName);
    console.log(JSON.stringify(transData, ' ', ' '));
  } else if (type == 'md' || type == 'markdown') {
    var converter = new _showdown2.default.Converter();
    var html = converter.makeHtml(data);
    transData = _html2json2.default.html2json(html, bindName);
    console.log(JSON.stringify(transData, ' ', ' '));
  }
  transData.view = {};
  transData.view.imagePadding = 0;
  if (typeof imagePadding != 'undefined') {
    transData.view.imagePadding = imagePadding;
  }
  var bindData = {};
  bindData[bindName] = transData;
  that.setData(bindData);
  that.wxParseImgLoad = wxParseImgLoad;
  that.wxParseImgTap = wxParseImgTap;
}
// 图片点击事件
function wxParseImgTap(e) {
  var that = this;
  var nowImgUrl = e.target.dataset.src;
  var tagFrom = e.target.dataset.from;
  if (typeof tagFrom != 'undefined' && tagFrom.length > 0) {
    wx.previewImage({
      current: nowImgUrl, // 当前显示图片的http链接
      urls: that.data[tagFrom].imageUrls // 需要预览的图片http链接列表
    });
  }
}

/**
 * 图片视觉宽高计算函数区 
 **/
function wxParseImgLoad(e) {
  var that = this;
  var tagFrom = e.target.dataset.from;
  var idx = e.target.dataset.idx;
  if (typeof tagFrom != 'undefined' && tagFrom.length > 0) {
    calMoreImageInfo(e, idx, that, tagFrom);
  }
}
// 假循环获取计算图片视觉最佳宽高
function calMoreImageInfo(e, idx, that, bindName) {
  var _that$setData;

  var temData = that.data[bindName];
  if (!temData || temData.images.length == 0) {
    return;
  }
  var temImages = temData.images;
  //因为无法获取view宽度 需要自定义padding进行计算，稍后处理
  var recal = wxAutoImageCal(e.detail.width, e.detail.height, that, bindName);
  // temImages[idx].width = recal.imageWidth;
  // temImages[idx].height = recal.imageheight; 
  // temData.images = temImages;
  // var bindData = {};
  // bindData[bindName] = temData;
  // that.setData(bindData);
  var index = temImages[idx].index;
  var key = '' + bindName;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = index.split('.')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;
      key += '.nodes[' + i + ']';
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var keyW = key + '.width';
  var keyH = key + '.height';
  that.setData((_that$setData = {}, _defineProperty(_that$setData, keyW, recal.imageWidth), _defineProperty(_that$setData, keyH, recal.imageheight), _that$setData));
}

// 计算视觉优先的图片宽高
function wxAutoImageCal(originalWidth, originalHeight, that, bindName) {
  //获取图片的原始长宽
  var windowWidth = 0,
      windowHeight = 0;
  var autoWidth = 0,
      autoHeight = 0;
  var results = {};
  var padding = that.data[bindName].view.imagePadding;
  windowWidth = realWindowWidth - 2 * padding;
  windowHeight = realWindowHeight;
  //判断按照那种方式进行缩放
  // console.log("windowWidth" + windowWidth);
  if (originalWidth > windowWidth) {
    //在图片width大于手机屏幕width时候
    autoWidth = windowWidth;
    // console.log("autoWidth" + autoWidth);
    autoHeight = autoWidth * originalHeight / originalWidth;
    // console.log("autoHeight" + autoHeight);
    results.imageWidth = autoWidth;
    results.imageheight = autoHeight;
  } else {
    //否则展示原来的数据
    results.imageWidth = originalWidth;
    results.imageheight = originalHeight;
  }
  return results;
}

function wxParseTemArray(temArrayName, bindNameReg, total, that) {
  var array = [];
  var temData = that.data;
  var obj = null;
  for (var i = 0; i < total; i++) {
    var simArr = temData[bindNameReg + i].nodes;
    array.push(simArr);
  }

  temArrayName = temArrayName || 'wxParseTemArray';
  obj = JSON.parse('{"' + temArrayName + '":""}');
  obj[temArrayName] = array;
  that.setData(obj);
}

/**
 * 配置emojis
 * 
 */

function emojisInit() {
  var reg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var baseSrc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/wxParse/emojis/";
  var emojis = arguments[2];

  _html2json2.default.emojisInit(reg, baseSrc, emojis);
}

module.exports = {
  wxParse: wxParse,
  wxParseTemArray: wxParseTemArray,
  emojisInit: emojisInit
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInd4UGFyc2UuanMiXSwibmFtZXMiOlsicmVhbFdpbmRvd1dpZHRoIiwicmVhbFdpbmRvd0hlaWdodCIsInd4IiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJyZXMiLCJ3aW5kb3dXaWR0aCIsIndpbmRvd0hlaWdodCIsInd4UGFyc2UiLCJiaW5kTmFtZSIsInR5cGUiLCJkYXRhIiwidGFyZ2V0IiwiaW1hZ2VQYWRkaW5nIiwidGhhdCIsInRyYW5zRGF0YSIsImh0bWwyanNvbiIsImNvbnNvbGUiLCJsb2ciLCJKU09OIiwic3RyaW5naWZ5IiwiY29udmVydGVyIiwiQ29udmVydGVyIiwiaHRtbCIsIm1ha2VIdG1sIiwidmlldyIsImJpbmREYXRhIiwic2V0RGF0YSIsInd4UGFyc2VJbWdMb2FkIiwid3hQYXJzZUltZ1RhcCIsImUiLCJub3dJbWdVcmwiLCJkYXRhc2V0Iiwic3JjIiwidGFnRnJvbSIsImZyb20iLCJsZW5ndGgiLCJwcmV2aWV3SW1hZ2UiLCJjdXJyZW50IiwidXJscyIsImltYWdlVXJscyIsImlkeCIsImNhbE1vcmVJbWFnZUluZm8iLCJ0ZW1EYXRhIiwiaW1hZ2VzIiwidGVtSW1hZ2VzIiwicmVjYWwiLCJ3eEF1dG9JbWFnZUNhbCIsImRldGFpbCIsIndpZHRoIiwiaGVpZ2h0IiwiaW5kZXgiLCJrZXkiLCJzcGxpdCIsImkiLCJrZXlXIiwia2V5SCIsImltYWdlV2lkdGgiLCJpbWFnZWhlaWdodCIsIm9yaWdpbmFsV2lkdGgiLCJvcmlnaW5hbEhlaWdodCIsImF1dG9XaWR0aCIsImF1dG9IZWlnaHQiLCJyZXN1bHRzIiwicGFkZGluZyIsInd4UGFyc2VUZW1BcnJheSIsInRlbUFycmF5TmFtZSIsImJpbmROYW1lUmVnIiwidG90YWwiLCJhcnJheSIsIm9iaiIsInNpbUFyciIsIm5vZGVzIiwicHVzaCIsInBhcnNlIiwiZW1vamlzSW5pdCIsInJlZyIsImJhc2VTcmMiLCJlbW9qaXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdz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QW9CLE9BQS9CLENBQU47QUFDQUksTUFBSUosWUFBSixJQUFvQkcsS0FBcEI7QUFDQXZELE9BQUthLE9BQUwsQ0FBYTJDLEdBQWI7QUFDRDs7QUFFRDs7Ozs7QUFLQSxTQUFTSyxVQUFULEdBQTZEO0FBQUEsTUFBekNDLEdBQXlDLHVFQUFyQyxFQUFxQztBQUFBLE1BQWxDQyxPQUFrQyx1RUFBMUIsa0JBQTBCO0FBQUEsTUFBUEMsTUFBTzs7QUFDMUQsc0JBQVdILFVBQVgsQ0FBc0JDLEdBQXRCLEVBQTBCQyxPQUExQixFQUFrQ0MsTUFBbEM7QUFDRjs7QUFFREMsT0FBT0MsT0FBUCxHQUFpQjtBQUNmeEUsV0FBU0EsT0FETTtBQUVmeUQsbUJBQWdCQSxlQUZEO0FBR2ZVLGNBQVdBO0FBSEksQ0FBakIiLCJmaWxlIjoid3hQYXJzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBhdXRob3I6IERpICjlvq7kv6HlsI/nqIvluo/lvIDlj5Hlt6XnqIvluIgpXHJcbiAqIG9yZ2FuaXphdGlvbjogV2VBcHBEZXYo5b6u5L+h5bCP56iL5bqP5byA5Y+R6K665Z2bKShodHRwOi8vd2VhcHBkZXYuY29tKVxyXG4gKiAgICAgICAgICAgICAgIOWeguebtOW+ruS/oeWwj+eoi+W6j+W8gOWPkeS6pOa1geekvuWMulxyXG4gKiBcclxuICogZ2l0aHVi5Zyw5Z2AOiBodHRwczovL2dpdGh1Yi5jb20vaWNpbmR5L3d4UGFyc2VcclxuICogXHJcbiAqIGZvcjog5b6u5L+h5bCP56iL5bqP5a+M5paH5pys6Kej5p6QXHJcbiAqIGRldGFpbCA6IGh0dHA6Ly93ZWFwcGRldi5jb20vdC93eHBhcnNlLWFscGhhMC0xLWh0bWwtbWFya2Rvd24vMTg0XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIHV0aWxz5Ye95pWw5byV5YWlXHJcbiAqKi9cclxuaW1wb3J0IHNob3dkb3duIGZyb20gJy4vc2hvd2Rvd24uanMnO1xyXG5pbXBvcnQgSHRtbFRvSnNvbiBmcm9tICcuL2h0bWwyanNvbi5qcyc7XHJcbi8qKlxyXG4gKiDphY3nva7lj4rlhazmnInlsZ7mgKdcclxuICoqL1xyXG52YXIgcmVhbFdpbmRvd1dpZHRoID0gMDtcclxudmFyIHJlYWxXaW5kb3dIZWlnaHQgPSAwO1xyXG53eC5nZXRTeXN0ZW1JbmZvKHtcclxuICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICByZWFsV2luZG93V2lkdGggPSByZXMud2luZG93V2lkdGhcclxuICAgIHJlYWxXaW5kb3dIZWlnaHQgPSByZXMud2luZG93SGVpZ2h0XHJcbiAgfVxyXG59KVxyXG4vKipcclxuICog5Li75Ye95pWw5YWl5Y+j5Yy6XHJcbiAqKi9cclxuZnVuY3Rpb24gd3hQYXJzZShiaW5kTmFtZSA9ICd3eFBhcnNlRGF0YScsIHR5cGU9J2h0bWwnLCBkYXRhPSc8ZGl2IGNsYXNzPVwiY29sb3I6cmVkO1wiPuaVsOaNruS4jeiDveS4uuepujwvZGl2PicsIHRhcmdldCxpbWFnZVBhZGRpbmcpIHtcclxuICB2YXIgdGhhdCA9IHRhcmdldDtcclxuICB2YXIgdHJhbnNEYXRhID0ge307Ly/lrZjmlL7ovazljJblkI7nmoTmlbDmja5cclxuICBpZiAodHlwZSA9PSAnaHRtbCcpIHtcclxuICAgIHRyYW5zRGF0YSA9IEh0bWxUb0pzb24uaHRtbDJqc29uKGRhdGEsIGJpbmROYW1lKTtcclxuICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRyYW5zRGF0YSwgJyAnLCAnICcpKTtcclxuICB9IGVsc2UgaWYgKHR5cGUgPT0gJ21kJyB8fCB0eXBlID09ICdtYXJrZG93bicpIHtcclxuICAgIHZhciBjb252ZXJ0ZXIgPSBuZXcgc2hvd2Rvd24uQ29udmVydGVyKCk7XHJcbiAgICB2YXIgaHRtbCA9IGNvbnZlcnRlci5tYWtlSHRtbChkYXRhKTtcclxuICAgIHRyYW5zRGF0YSA9IEh0bWxUb0pzb24uaHRtbDJqc29uKGh0bWwsIGJpbmROYW1lKTtcclxuICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRyYW5zRGF0YSwgJyAnLCAnICcpKTtcclxuICB9XHJcbiAgdHJhbnNEYXRhLnZpZXcgPSB7fTtcclxuICB0cmFuc0RhdGEudmlldy5pbWFnZVBhZGRpbmcgPSAwO1xyXG4gIGlmKHR5cGVvZihpbWFnZVBhZGRpbmcpICE9ICd1bmRlZmluZWQnKXtcclxuICAgIHRyYW5zRGF0YS52aWV3LmltYWdlUGFkZGluZyA9IGltYWdlUGFkZGluZ1xyXG4gIH1cclxuICB2YXIgYmluZERhdGEgPSB7fTtcclxuICBiaW5kRGF0YVtiaW5kTmFtZV0gPSB0cmFuc0RhdGE7XHJcbiAgdGhhdC5zZXREYXRhKGJpbmREYXRhKVxyXG4gIHRoYXQud3hQYXJzZUltZ0xvYWQgPSB3eFBhcnNlSW1nTG9hZDtcclxuICB0aGF0Lnd4UGFyc2VJbWdUYXAgPSB3eFBhcnNlSW1nVGFwO1xyXG59XHJcbi8vIOWbvueJh+eCueWHu+S6i+S7tlxyXG5mdW5jdGlvbiB3eFBhcnNlSW1nVGFwKGUpIHtcclxuICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgdmFyIG5vd0ltZ1VybCA9IGUudGFyZ2V0LmRhdGFzZXQuc3JjO1xyXG4gIHZhciB0YWdGcm9tID0gZS50YXJnZXQuZGF0YXNldC5mcm9tO1xyXG4gIGlmICh0eXBlb2YgKHRhZ0Zyb20pICE9ICd1bmRlZmluZWQnICYmIHRhZ0Zyb20ubGVuZ3RoID4gMCkge1xyXG4gICAgd3gucHJldmlld0ltYWdlKHtcclxuICAgICAgY3VycmVudDogbm93SW1nVXJsLCAvLyDlvZPliY3mmL7npLrlm77niYfnmoRodHRw6ZO+5o6lXHJcbiAgICAgIHVybHM6IHRoYXQuZGF0YVt0YWdGcm9tXS5pbWFnZVVybHMgLy8g6ZyA6KaB6aKE6KeI55qE5Zu+54mHaHR0cOmTvuaOpeWIl+ihqFxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDlm77niYfop4bop4nlrr3pq5jorqHnrpflh73mlbDljLogXHJcbiAqKi9cclxuZnVuY3Rpb24gd3hQYXJzZUltZ0xvYWQoZSkge1xyXG4gIHZhciB0aGF0ID0gdGhpcztcclxuICB2YXIgdGFnRnJvbSA9IGUudGFyZ2V0LmRhdGFzZXQuZnJvbTtcclxuICB2YXIgaWR4ID0gZS50YXJnZXQuZGF0YXNldC5pZHg7XHJcbiAgaWYgKHR5cGVvZiAodGFnRnJvbSkgIT0gJ3VuZGVmaW5lZCcgJiYgdGFnRnJvbS5sZW5ndGggPiAwKSB7XHJcbiAgICBjYWxNb3JlSW1hZ2VJbmZvKGUsIGlkeCwgdGhhdCwgdGFnRnJvbSlcclxuICB9IFxyXG59XHJcbi8vIOWBh+W+queOr+iOt+WPluiuoeeul+WbvueJh+inhuinieacgOS9s+WuvemrmFxyXG5mdW5jdGlvbiBjYWxNb3JlSW1hZ2VJbmZvKGUsIGlkeCwgdGhhdCwgYmluZE5hbWUpIHtcclxuICB2YXIgdGVtRGF0YSA9IHRoYXQuZGF0YVtiaW5kTmFtZV07XHJcbiAgaWYgKCF0ZW1EYXRhIHx8IHRlbURhdGEuaW1hZ2VzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIHZhciB0ZW1JbWFnZXMgPSB0ZW1EYXRhLmltYWdlcztcclxuICAvL+WboOS4uuaXoOazleiOt+WPlnZpZXflrr3luqYg6ZyA6KaB6Ieq5a6a5LmJcGFkZGluZ+i/m+ihjOiuoeeul++8jOeojeWQjuWkhOeQhlxyXG4gIHZhciByZWNhbCA9IHd4QXV0b0ltYWdlQ2FsKGUuZGV0YWlsLndpZHRoLCBlLmRldGFpbC5oZWlnaHQsdGhhdCxiaW5kTmFtZSk7IFxyXG4gIC8vIHRlbUltYWdlc1tpZHhdLndpZHRoID0gcmVjYWwuaW1hZ2VXaWR0aDtcclxuICAvLyB0ZW1JbWFnZXNbaWR4XS5oZWlnaHQgPSByZWNhbC5pbWFnZWhlaWdodDsgXHJcbiAgLy8gdGVtRGF0YS5pbWFnZXMgPSB0ZW1JbWFnZXM7XHJcbiAgLy8gdmFyIGJpbmREYXRhID0ge307XHJcbiAgLy8gYmluZERhdGFbYmluZE5hbWVdID0gdGVtRGF0YTtcclxuICAvLyB0aGF0LnNldERhdGEoYmluZERhdGEpO1xyXG4gIHZhciBpbmRleCA9IHRlbUltYWdlc1tpZHhdLmluZGV4XHJcbiAgdmFyIGtleSA9IGAke2JpbmROYW1lfWBcclxuICBmb3IgKHZhciBpIG9mIGluZGV4LnNwbGl0KCcuJykpIGtleSs9YC5ub2Rlc1ske2l9XWBcclxuICB2YXIga2V5VyA9IGtleSArICcud2lkdGgnXHJcbiAgdmFyIGtleUggPSBrZXkgKyAnLmhlaWdodCdcclxuICB0aGF0LnNldERhdGEoe1xyXG4gICAgW2tleVddOiByZWNhbC5pbWFnZVdpZHRoLFxyXG4gICAgW2tleUhdOiByZWNhbC5pbWFnZWhlaWdodCxcclxuICB9KVxyXG59XHJcblxyXG4vLyDorqHnrpfop4bop4nkvJjlhYjnmoTlm77niYflrr3pq5hcclxuZnVuY3Rpb24gd3hBdXRvSW1hZ2VDYWwob3JpZ2luYWxXaWR0aCwgb3JpZ2luYWxIZWlnaHQsdGhhdCxiaW5kTmFtZSkge1xyXG4gIC8v6I635Y+W5Zu+54mH55qE5Y6f5aeL6ZW/5a69XHJcbiAgdmFyIHdpbmRvd1dpZHRoID0gMCwgd2luZG93SGVpZ2h0ID0gMDtcclxuICB2YXIgYXV0b1dpZHRoID0gMCwgYXV0b0hlaWdodCA9IDA7XHJcbiAgdmFyIHJlc3VsdHMgPSB7fTtcclxuICB2YXIgcGFkZGluZyA9IHRoYXQuZGF0YVtiaW5kTmFtZV0udmlldy5pbWFnZVBhZGRpbmc7XHJcbiAgd2luZG93V2lkdGggPSByZWFsV2luZG93V2lkdGgtMipwYWRkaW5nO1xyXG4gIHdpbmRvd0hlaWdodCA9IHJlYWxXaW5kb3dIZWlnaHQ7XHJcbiAgLy/liKTmlq3mjInnhafpgqPnp43mlrnlvI/ov5vooYznvKnmlL5cclxuICAvLyBjb25zb2xlLmxvZyhcIndpbmRvd1dpZHRoXCIgKyB3aW5kb3dXaWR0aCk7XHJcbiAgaWYgKG9yaWdpbmFsV2lkdGggPiB3aW5kb3dXaWR0aCkgey8v5Zyo5Zu+54mHd2lkdGjlpKfkuo7miYvmnLrlsY/luZV3aWR0aOaXtuWAmVxyXG4gICAgYXV0b1dpZHRoID0gd2luZG93V2lkdGg7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcImF1dG9XaWR0aFwiICsgYXV0b1dpZHRoKTtcclxuICAgIGF1dG9IZWlnaHQgPSAoYXV0b1dpZHRoICogb3JpZ2luYWxIZWlnaHQpIC8gb3JpZ2luYWxXaWR0aDtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiYXV0b0hlaWdodFwiICsgYXV0b0hlaWdodCk7XHJcbiAgICByZXN1bHRzLmltYWdlV2lkdGggPSBhdXRvV2lkdGg7XHJcbiAgICByZXN1bHRzLmltYWdlaGVpZ2h0ID0gYXV0b0hlaWdodDtcclxuICB9IGVsc2Ugey8v5ZCm5YiZ5bGV56S65Y6f5p2l55qE5pWw5o2uXHJcbiAgICByZXN1bHRzLmltYWdlV2lkdGggPSBvcmlnaW5hbFdpZHRoO1xyXG4gICAgcmVzdWx0cy5pbWFnZWhlaWdodCA9IG9yaWdpbmFsSGVpZ2h0O1xyXG4gIH1cclxuICByZXR1cm4gcmVzdWx0cztcclxufVxyXG5cclxuZnVuY3Rpb24gd3hQYXJzZVRlbUFycmF5KHRlbUFycmF5TmFtZSxiaW5kTmFtZVJlZyx0b3RhbCx0aGF0KXtcclxuICB2YXIgYXJyYXkgPSBbXTtcclxuICB2YXIgdGVtRGF0YSA9IHRoYXQuZGF0YTtcclxuICB2YXIgb2JqID0gbnVsbDtcclxuICBmb3IodmFyIGkgPSAwOyBpIDwgdG90YWw7IGkrKyl7XHJcbiAgICB2YXIgc2ltQXJyID0gdGVtRGF0YVtiaW5kTmFtZVJlZytpXS5ub2RlcztcclxuICAgIGFycmF5LnB1c2goc2ltQXJyKTtcclxuICB9XHJcblxyXG4gIHRlbUFycmF5TmFtZSA9IHRlbUFycmF5TmFtZSB8fCAnd3hQYXJzZVRlbUFycmF5JztcclxuICBvYmogPSBKU09OLnBhcnNlKCd7XCInKyB0ZW1BcnJheU5hbWUgKydcIjpcIlwifScpO1xyXG4gIG9ialt0ZW1BcnJheU5hbWVdID0gYXJyYXk7XHJcbiAgdGhhdC5zZXREYXRhKG9iaik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDphY3nva5lbW9qaXNcclxuICogXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gZW1vamlzSW5pdChyZWc9JycsYmFzZVNyYz1cIi93eFBhcnNlL2Vtb2ppcy9cIixlbW9qaXMpe1xyXG4gICBIdG1sVG9Kc29uLmVtb2ppc0luaXQocmVnLGJhc2VTcmMsZW1vamlzKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgd3hQYXJzZTogd3hQYXJzZSxcclxuICB3eFBhcnNlVGVtQXJyYXk6d3hQYXJzZVRlbUFycmF5LFxyXG4gIGVtb2ppc0luaXQ6ZW1vamlzSW5pdFxyXG59XHJcblxyXG5cclxuIl19