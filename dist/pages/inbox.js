'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var inbox = function (_wepy$page) {
  _inherits(inbox, _wepy$page);

  function inbox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, inbox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = inbox.__proto__ || Object.getPrototypeOf(inbox)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: 'ExtMail'
    }, _this.components = {}, _this.data = {
      username: '',
      folders: ''
    }, _this.computed = {}, _this.methods = {
      refresh: function refresh() {
        var self = this;
        _wepy2.default.request({
          url: 'https://dywsweb.com/getfolders',
          data: {},
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          success: function success(res) {

            self.folders = res.data;
          }
        });
      },
      getmaillist: function getmaillist(e) {
        var self = this;
        wx.navigateTo({
          url: "/pages/maillist?category=folder&folderid=" + e.currentTarget.dataset.id + "&page=1&perpage=10&sort=time_desc&foldername=" + e.currentTarget.dataset.name
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(inbox, [{
    key: 'onShow',
    value: function onShow() {
      var self = this;
      _wepy2.default.removeStorageSync('options');
      self.username = _wepy2.default.getStorageSync("username");
      _wepy2.default.showLoading({
        title: '加载中'
      });

      _wepy2.default.request({
        url: 'https://dywsweb.com/getfolders',
        data: {},
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function success(res) {

          self.folders = res.data;
          self.$apply();
          wx.hideLoading();
        }
      });
    }
  }]);

  return inbox;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(inbox , 'pages/inbox'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluYm94LmpzIl0sIm5hbWVzIjpbImluYm94IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJkYXRhIiwidXNlcm5hbWUiLCJmb2xkZXJzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwicmVmcmVzaCIsInNlbGYiLCJyZXF1ZXN0IiwidXJsIiwiaGVhZGVyIiwibWV0aG9kIiwic3VjY2VzcyIsInJlcyIsImdldG1haWxsaXN0IiwiZSIsInd4IiwibmF2aWdhdGVUbyIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaWQiLCJuYW1lIiwicmVtb3ZlU3RvcmFnZVN5bmMiLCJnZXRTdG9yYWdlU3luYyIsInNob3dMb2FkaW5nIiwidGl0bGUiLCIkYXBwbHkiLCJoaWRlTG9hZGluZyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLFUsR0FBYSxFLFFBSWJDLEksR0FBTztBQUNOQyxnQkFBUyxFQURIO0FBRU5DLGVBQVE7QUFGRixLLFFBS1BDLFEsR0FBVyxFLFFBSVhDLE8sR0FBVTtBQUNSQyxhQURRLHFCQUNDO0FBQ1AsWUFBSUMsT0FBTyxJQUFYO0FBQ0EsdUJBQUtDLE9BQUwsQ0FBYTtBQUNWQyxlQUFLLGdDQURLO0FBRVZSLGdCQUFNLEVBRkk7QUFJVlMsa0JBQVE7QUFDTiw0QkFBZ0I7QUFEVixXQUpFO0FBT1ZDLGtCQUFRLE1BUEU7QUFRVkMsbUJBQVMsaUJBQVVDLEdBQVYsRUFBZTs7QUFFdEJOLGlCQUFLSixPQUFMLEdBQWVVLElBQUlaLElBQW5CO0FBQ0Q7QUFYUyxTQUFiO0FBYUQsT0FoQk87QUFpQlJhLGlCQWpCUSx1QkFpQklDLENBakJKLEVBaUJNO0FBQ1osWUFBSVIsT0FBTyxJQUFYO0FBQ0FTLFdBQUdDLFVBQUgsQ0FBYztBQUNaUixlQUFLLDhDQUE0Q00sRUFBRUcsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JDLEVBQXBFLEdBQXVFLCtDQUF2RSxHQUF1SEwsRUFBRUcsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JFO0FBRHhJLFNBQWQ7QUFHRDtBQXRCTyxLOzs7Ozs2QkF3QkY7QUFDTixVQUFJZCxPQUFPLElBQVg7QUFDQSxxQkFBS2UsaUJBQUwsQ0FBdUIsU0FBdkI7QUFDQWYsV0FBS0wsUUFBTCxHQUFnQixlQUFLcUIsY0FBTCxDQUFvQixVQUFwQixDQUFoQjtBQUNBLHFCQUFLQyxXQUFMLENBQWlCO0FBQ2ZDLGVBQU87QUFEUSxPQUFqQjs7QUFJQSxxQkFBS2pCLE9BQUwsQ0FBYTtBQUNSQyxhQUFLLGdDQURHO0FBRVJSLGNBQU0sRUFGRTtBQUlSUyxnQkFBUTtBQUNOLDBCQUFnQjtBQURWLFNBSkE7QUFPUkMsZ0JBQVEsTUFQQTtBQVFSQyxpQkFBUyxpQkFBVUMsR0FBVixFQUFlOztBQUV0Qk4sZUFBS0osT0FBTCxHQUFlVSxJQUFJWixJQUFuQjtBQUNBTSxlQUFLbUIsTUFBTDtBQUNBVixhQUFHVyxXQUFIO0FBQ0Q7QUFiTyxPQUFiO0FBZUQ7Ozs7RUFoRWdDLGVBQUtDLEk7O2tCQUFuQi9CLEsiLCJmaWxlIjoiaW5ib3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBpbmJveCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdFeHRNYWlsJ1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50cyA9IHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICB1c2VybmFtZTonJyxcclxuICAgICBmb2xkZXJzOicnXHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIHJlZnJlc2goKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgIHVybDogJ2h0dHBzOi8vZHl3c3dlYi5jb20vZ2V0Zm9sZGVycycsXHJcbiAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcclxuICAgICAgICAgICB9LFxyXG4gICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuXHJcbiAgICAgICAgICAgICBzZWxmLmZvbGRlcnMgPSByZXMuZGF0YVxyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGdldG1haWxsaXN0KGUpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgdXJsOiBcIi9wYWdlcy9tYWlsbGlzdD9jYXRlZ29yeT1mb2xkZXImZm9sZGVyaWQ9XCIrZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWQrXCImcGFnZT0xJnBlcnBhZ2U9MTAmc29ydD10aW1lX2Rlc2MmZm9sZGVybmFtZT1cIitlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5uYW1lXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25TaG93KCl7XHJcbiAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICB3ZXB5LnJlbW92ZVN0b3JhZ2VTeW5jKCdvcHRpb25zJylcclxuICAgICAgc2VsZi51c2VybmFtZSA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoXCJ1c2VybmFtZVwiKVxyXG4gICAgICB3ZXB5LnNob3dMb2FkaW5nKHtcclxuICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgIH0pXHJcbiAgICAgIFxyXG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgIHVybDogJ2h0dHBzOi8vZHl3c3dlYi5jb20vZ2V0Zm9sZGVycycsXHJcbiAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcclxuICAgICAgICAgICB9LFxyXG4gICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuXHJcbiAgICAgICAgICAgICBzZWxmLmZvbGRlcnMgPSByZXMuZGF0YVxyXG4gICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=