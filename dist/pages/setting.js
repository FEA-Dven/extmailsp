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

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: 'ExtMail'
    }, _this.components = {}, _this.data = {
      nickname: '',
      email: '',
      headphoto: ''
    }, _this.computed = {}, _this.methods = {
      savesetting: function savesetting() {
        var self = this;
        var savedata = {
          nickname: self.nickname,
          email: self.email
        };
        _wepy2.default.request({
          url: 'https://dywsweb.com/savesetting',
          data: savedata,
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          success: function success(res) {
            if (res.data == 'success') {
              _wepy2.default.showToast({
                title: '保存成功',
                duration: 1000
              });
            }
          }
        });
      },
      logout: function logout() {
        _wepy2.default.removeStorageSync('username');
        _wepy2.default.redirectTo({
          url: '/pages/index'
        });
      },
      changenickname: function changenickname(e) {
        var self = this;
        self.nickname = e.detail.value;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onShow',
    value: function onShow() {
      var self = this;
      _wepy2.default.removeStorageSync('options');
      self.headphoto = _wepy2.default.getStorageSync('userInfo').avatarUrl || '../assets/userphoto.png';
      self.nickname = _wepy2.default.getStorageSync('userInfo').nickName || _wepy2.default.getStorageSync('username');
      self.email = _wepy2.default.getStorageSync('username');
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/setting'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmcuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsImRhdGEiLCJuaWNrbmFtZSIsImVtYWlsIiwiaGVhZHBob3RvIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwic2F2ZXNldHRpbmciLCJzZWxmIiwic2F2ZWRhdGEiLCJyZXF1ZXN0IiwidXJsIiwiaGVhZGVyIiwibWV0aG9kIiwic3VjY2VzcyIsInJlcyIsInNob3dUb2FzdCIsInRpdGxlIiwiZHVyYXRpb24iLCJsb2dvdXQiLCJyZW1vdmVTdG9yYWdlU3luYyIsInJlZGlyZWN0VG8iLCJjaGFuZ2VuaWNrbmFtZSIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImdldFN0b3JhZ2VTeW5jIiwiYXZhdGFyVXJsIiwibmlja05hbWUiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWEsRSxRQUliQyxJLEdBQU87QUFDTkMsZ0JBQVMsRUFESDtBQUVOQyxhQUFNLEVBRkE7QUFHTkMsaUJBQVU7QUFISixLLFFBTVBDLFEsR0FBVyxFLFFBSVhDLE8sR0FBVTtBQUNSQyxpQkFEUSx5QkFDSztBQUNYLFlBQUlDLE9BQU8sSUFBWDtBQUNBLFlBQUlDLFdBQVc7QUFDYlAsb0JBQVNNLEtBQUtOLFFBREQ7QUFFYkMsaUJBQU1LLEtBQUtMO0FBRkUsU0FBZjtBQUlBLHVCQUFLTyxPQUFMLENBQWE7QUFDVkMsZUFBSyxpQ0FESztBQUVWVixnQkFBTVEsUUFGSTtBQUdURyxrQkFBUTtBQUNOLDRCQUFnQjtBQURWLFdBSEM7QUFNVkMsa0JBQVEsTUFORTtBQU9WQyxtQkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCLGdCQUFHQSxJQUFJZCxJQUFKLElBQVUsU0FBYixFQUF1QjtBQUNwQiw2QkFBS2UsU0FBTCxDQUFlO0FBQ2JDLHVCQUFPLE1BRE07QUFFYkMsMEJBQVU7QUFGRyxlQUFmO0FBSUE7QUFDSjtBQWRTLFNBQWI7QUFnQkQsT0F2Qk87QUF3QlJDLFlBeEJRLG9CQXdCQTtBQUNQLHVCQUFLQyxpQkFBTCxDQUF1QixVQUF2QjtBQUNBLHVCQUFLQyxVQUFMLENBQWdCO0FBQ2ZWLGVBQUk7QUFEVyxTQUFoQjtBQUdBLE9BN0JPO0FBOEJSVyxvQkE5QlEsMEJBOEJPQyxDQTlCUCxFQThCUztBQUNmLFlBQUlmLE9BQU8sSUFBWDtBQUNBQSxhQUFLTixRQUFMLEdBQWdCcUIsRUFBRUMsTUFBRixDQUFTQyxLQUF6QjtBQUNEO0FBakNPLEs7Ozs7OzZCQW9DRDtBQUNSLFVBQUlqQixPQUFPLElBQVg7QUFDQSxxQkFBS1ksaUJBQUwsQ0FBdUIsU0FBdkI7QUFDQVosV0FBS0osU0FBTCxHQUFpQixlQUFLc0IsY0FBTCxDQUFvQixVQUFwQixFQUFnQ0MsU0FBaEMsSUFBNkMseUJBQTlEO0FBQ0FuQixXQUFLTixRQUFMLEdBQWdCLGVBQUt3QixjQUFMLENBQW9CLFVBQXBCLEVBQWdDRSxRQUFoQyxJQUE0QyxlQUFLRixjQUFMLENBQW9CLFVBQXBCLENBQTVEO0FBQ0FsQixXQUFLTCxLQUFMLEdBQWEsZUFBS3VCLGNBQUwsQ0FBb0IsVUFBcEIsQ0FBYjtBQUNBOzs7O0VBNURnQyxlQUFLRyxJOztrQkFBbkJoQyxLIiwiZmlsZSI6InNldHRpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdFeHRNYWlsJ1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50cyA9IHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICBuaWNrbmFtZTonJyxcclxuICAgICBlbWFpbDonJyxcclxuICAgICBoZWFkcGhvdG86JydcclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgc2F2ZXNldHRpbmcoKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICBsZXQgc2F2ZWRhdGEgPSB7XHJcbiAgICAgICAgICBuaWNrbmFtZTpzZWxmLm5pY2tuYW1lLFxyXG4gICAgICAgICAgZW1haWw6c2VsZi5lbWFpbFxyXG4gICAgICAgIH1cclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgIHVybDogJ2h0dHBzOi8vZHl3c3dlYi5jb20vc2F2ZXNldHRpbmcnLFxyXG4gICAgICAgICAgIGRhdGE6IHNhdmVkYXRhLFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICBpZihyZXMuZGF0YT09J3N1Y2Nlc3MnKXtcclxuICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6ICfkv53lrZjmiJDlip8nLFxyXG4gICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGxvZ291dCgpe1xyXG4gICAgICAgd2VweS5yZW1vdmVTdG9yYWdlU3luYygndXNlcm5hbWUnKVxyXG4gICAgICAgd2VweS5yZWRpcmVjdFRvKHtcclxuICAgICAgICB1cmw6Jy9wYWdlcy9pbmRleCdcclxuICAgICAgIH0pXHJcbiAgICAgIH0sXHJcbiAgICAgIGNoYW5nZW5pY2tuYW1lKGUpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHNlbGYubmlja25hbWUgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93KCkge1xyXG4gICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgIHdlcHkucmVtb3ZlU3RvcmFnZVN5bmMoJ29wdGlvbnMnKVxyXG4gICAgIHNlbGYuaGVhZHBob3RvID0gd2VweS5nZXRTdG9yYWdlU3luYygndXNlckluZm8nKS5hdmF0YXJVcmwgfHwgJy4uL2Fzc2V0cy91c2VycGhvdG8ucG5nJ1xyXG4gICAgIHNlbGYubmlja25hbWUgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd1c2VySW5mbycpLm5pY2tOYW1lIHx8IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3VzZXJuYW1lJylcclxuICAgICBzZWxmLmVtYWlsID0gd2VweS5nZXRTdG9yYWdlU3luYygndXNlcm5hbWUnKVxyXG4gICAgfVxyXG4gIH1cclxuIl19