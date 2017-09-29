'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: ['pages/index', 'pages/inbox', 'pages/maillist', 'pages/mailinfo', 'pages/userlist', 'pages/write', 'pages/setting'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#0089ce',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'white'
      },
      tabBar: {
        color: '#515151',
        selectedColor: '#0089ce',
        borderStyle: 'black',
        list: [{
          selectedIconPath: './assets/b_letter.png',
          iconPath: './assets/h_letter.png',
          pagePath: 'pages/inbox',
          text: '文件夹'
        }, {
          selectedIconPath: './assets/b_brush.png',
          iconPath: './assets/h_brush.png',
          pagePath: 'pages/write',
          text: '写信'
        }, {
          selectedIconPath: './assets/b_group_fill.png',
          iconPath: './assets/group_fill.png',
          pagePath: 'pages/userlist',
          text: '通信录'
        }, {
          selectedIconPath: './assets/b_set.png',
          iconPath: './assets/h_set.png',
          pagePath: 'pages/setting',
          text: '设置'
        }]
      }

    };
    _this.globalData = {
      userInfo: null
    };

    _this.use('requestfix');
    return _this;
  }

  _createClass(_default, [{
    key: 'getUserInfo',
    value: function getUserInfo(cb) {
      var that = this;
      if (this.globalData.userInfo) {
        return this.globalData.userInfo;
      }
      _wepy2.default.getUserInfo({
        success: function success(res) {
          that.globalData.userInfo = res.userInfo;
          cb && cb(res.userInfo);
        }
      });
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, undefined));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJib3JkZXJTdHlsZSIsImxpc3QiLCJzZWxlY3RlZEljb25QYXRoIiwiaWNvblBhdGgiLCJwYWdlUGF0aCIsInRleHQiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJ1c2UiLCJjYiIsInRoYXQiLCJnZXRVc2VySW5mbyIsInN1Y2Nlc3MiLCJyZXMiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUF5REUsc0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxVQXREZkEsTUFzRGUsR0F0RE47QUFDUEMsYUFBTyxDQUNMLGFBREssRUFFTCxhQUZLLEVBR0wsZ0JBSEssRUFJTCxnQkFKSyxFQUtMLGdCQUxLLEVBTUwsYUFOSyxFQU9MLGVBUEssQ0FEQTtBQVVQQyxjQUFRO0FBQ05DLDZCQUFxQixPQURmO0FBRU5DLHNDQUE4QixTQUZ4QjtBQUdOQyxnQ0FBd0IsUUFIbEI7QUFJTkMsZ0NBQXdCO0FBSmxCLE9BVkQ7QUFnQlBDLGNBQVE7QUFDUkMsZUFBTyxTQURDO0FBRVJDLHVCQUFlLFNBRlA7QUFHUkMscUJBQWEsT0FITDtBQUlSQyxjQUFNLENBQ0o7QUFDRUMsNEJBQWtCLHVCQURwQjtBQUVFQyxvQkFBVSx1QkFGWjtBQUdFQyxvQkFBVSxhQUhaO0FBSUVDLGdCQUFNO0FBSlIsU0FESSxFQU9KO0FBQ0VILDRCQUFrQixzQkFEcEI7QUFFRUMsb0JBQVUsc0JBRlo7QUFHRUMsb0JBQVUsYUFIWjtBQUlFQyxnQkFBTTtBQUpSLFNBUEksRUFhSjtBQUNFSCw0QkFBa0IsMkJBRHBCO0FBRUVDLG9CQUFVLHlCQUZaO0FBR0VDLG9CQUFVLGdCQUhaO0FBSUVDLGdCQUFNO0FBSlIsU0FiSSxFQW1CSjtBQUNFSCw0QkFBa0Isb0JBRHBCO0FBRUVDLG9CQUFVLG9CQUZaO0FBR0VDLG9CQUFVLGVBSFo7QUFJRUMsZ0JBQU07QUFKUixTQW5CSTtBQUpFOztBQWhCRCxLQXNETTtBQUFBLFVBSmZDLFVBSWUsR0FKRjtBQUNYQyxnQkFBVTtBQURDLEtBSUU7O0FBRWIsVUFBS0MsR0FBTCxDQUFTLFlBQVQ7QUFGYTtBQUdkOzs7O2dDQUNXQyxFLEVBQUk7QUFDZCxVQUFNQyxPQUFPLElBQWI7QUFDQSxVQUFJLEtBQUtKLFVBQUwsQ0FBZ0JDLFFBQXBCLEVBQThCO0FBQzVCLGVBQU8sS0FBS0QsVUFBTCxDQUFnQkMsUUFBdkI7QUFDRDtBQUNELHFCQUFLSSxXQUFMLENBQWlCO0FBQ2ZDLGVBRGUsbUJBQ05DLEdBRE0sRUFDRDtBQUNaSCxlQUFLSixVQUFMLENBQWdCQyxRQUFoQixHQUEyQk0sSUFBSU4sUUFBL0I7QUFDQUUsZ0JBQU1BLEdBQUdJLElBQUlOLFFBQVAsQ0FBTjtBQUNEO0FBSmMsT0FBakI7QUFNRDs7OztFQXRFMEIsZUFBS08sRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgcGFnZXM6IFtcclxuICAgICAgJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgJ3BhZ2VzL2luYm94JyxcclxuICAgICAgJ3BhZ2VzL21haWxsaXN0JyxcclxuICAgICAgJ3BhZ2VzL21haWxpbmZvJyxcclxuICAgICAgJ3BhZ2VzL3VzZXJsaXN0JyxcclxuICAgICAgJ3BhZ2VzL3dyaXRlJyxcclxuICAgICAgJ3BhZ2VzL3NldHRpbmcnLFxyXG4gICAgXSxcclxuICAgIHdpbmRvdzoge1xyXG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnIzAwODljZScsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnd2hpdGUnXHJcbiAgICB9LFxyXG4gICAgdGFiQmFyOiB7XHJcbiAgICBjb2xvcjogJyM1MTUxNTEnLFxyXG4gICAgc2VsZWN0ZWRDb2xvcjogJyMwMDg5Y2UnLFxyXG4gICAgYm9yZGVyU3R5bGU6ICdibGFjaycsXHJcbiAgICBsaXN0OiBbXHJcbiAgICAgIHtcclxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnLi9hc3NldHMvYl9sZXR0ZXIucG5nJyxcclxuICAgICAgICBpY29uUGF0aDogJy4vYXNzZXRzL2hfbGV0dGVyLnBuZycsXHJcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9pbmJveCcsXHJcbiAgICAgICAgdGV4dDogJ+aWh+S7tuWkuSdcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICcuL2Fzc2V0cy9iX2JydXNoLnBuZycsXHJcbiAgICAgICAgaWNvblBhdGg6ICcuL2Fzc2V0cy9oX2JydXNoLnBuZycsXHJcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy93cml0ZScsXHJcbiAgICAgICAgdGV4dDogJ+WGmeS/oSdcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICcuL2Fzc2V0cy9iX2dyb3VwX2ZpbGwucG5nJyxcclxuICAgICAgICBpY29uUGF0aDogJy4vYXNzZXRzL2dyb3VwX2ZpbGwucG5nJyxcclxuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL3VzZXJsaXN0JyxcclxuICAgICAgICB0ZXh0OiAn6YCa5L+h5b2VJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJy4vYXNzZXRzL2Jfc2V0LnBuZycsXHJcbiAgICAgICAgaWNvblBhdGg6ICcuL2Fzc2V0cy9oX3NldC5wbmcnLFxyXG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvc2V0dGluZycsXHJcbiAgICAgICAgdGV4dDogJ+iuvue9ridcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH0sXHJcblxyXG4gIH1cclxuXHJcbiAgZ2xvYmFsRGF0YSA9IHtcclxuICAgIHVzZXJJbmZvOiBudWxsXHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXHJcbiAgfVxyXG4gIGdldFVzZXJJbmZvKGNiKSB7XHJcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgaWYgKHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbykge1xyXG4gICAgICByZXR1cm4gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvXHJcbiAgICB9XHJcbiAgICB3ZXB5LmdldFVzZXJJbmZvKHtcclxuICAgICAgc3VjY2VzcyAocmVzKSB7XHJcbiAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXHJcbiAgICAgICAgY2IgJiYgY2IocmVzLnVzZXJJbmZvKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG4iXX0=