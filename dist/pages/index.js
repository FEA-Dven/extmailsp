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
      userInfo: '',
      message: '123',
      email: '',
      password: '',
      firstclick: false,
      secondclick: false,
      openid: ''
    }, _this.computed = {}, _this.methods = {
      changeMessage: function changeMessage() {
        var self = this;
        self.message = '456';
      },
      focusEInput: function focusEInput() {
        this.firstclick = true;
        this.secondclick = false;
      },
      focusPInput: function focusPInput() {
        this.firstclick = false;
        this.secondclick = true;
      },
      getemailInput: function getemailInput(e) {
        this.email = e.detail.value;
      },
      getpasswordInput: function getpasswordInput(e) {
        this.password = e.detail.value;
      },
      loger: function loger() {
        var self = this;
        var patt = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
        if (patt.test(self.email)) {
          var mydata = {
            username: self.email,
            password: self.password,
            openid: self.openid
          };
          _wepy2.default.request({
            url: 'https://dywsweb.com/user',
            data: mydata,
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function success(res) {
              if (res.data == "success") {
                _wepy2.default.setStorageSync("username", self.email);
                _wepy2.default.switchTab({
                  url: '/pages/inbox'
                });
              } else {
                _wepy2.default.showToast({
                  title: '账号不正确',
                  image: '../assets/w_cha.png',
                  duration: 1000
                });
              }
            }
          });
        } else {
          _wepy2.default.showToast({
            title: '邮箱地址错误',
            image: '../assets/w_cha.png',
            duration: 1000
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {
      var self = this;
      if (options.opid === undefined) {} else {
        self.openid = options.opid;
      }
      this.$parent.getUserInfo(function (userInfo) {
        if (userInfo) {
          self.userInfo = userInfo;
          _wepy2.default.setStorageSync("userInfo", self.userInfo);
        }
        self.$apply();
      });
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJkYXRhIiwidXNlckluZm8iLCJtZXNzYWdlIiwiZW1haWwiLCJwYXNzd29yZCIsImZpcnN0Y2xpY2siLCJzZWNvbmRjbGljayIsIm9wZW5pZCIsImNvbXB1dGVkIiwibWV0aG9kcyIsImNoYW5nZU1lc3NhZ2UiLCJzZWxmIiwiZm9jdXNFSW5wdXQiLCJmb2N1c1BJbnB1dCIsImdldGVtYWlsSW5wdXQiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJnZXRwYXNzd29yZElucHV0IiwibG9nZXIiLCJwYXR0IiwidGVzdCIsIm15ZGF0YSIsInVzZXJuYW1lIiwicmVxdWVzdCIsInVybCIsImhlYWRlciIsIm1ldGhvZCIsInN1Y2Nlc3MiLCJyZXMiLCJzZXRTdG9yYWdlU3luYyIsInN3aXRjaFRhYiIsInNob3dUb2FzdCIsInRpdGxlIiwiaW1hZ2UiLCJkdXJhdGlvbiIsIm9wdGlvbnMiLCJvcGlkIiwidW5kZWZpbmVkIiwiJHBhcmVudCIsImdldFVzZXJJbmZvIiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhLEUsUUFJYkMsSSxHQUFPO0FBQ05DLGdCQUFTLEVBREg7QUFFTkMsZUFBUSxLQUZGO0FBR05DLGFBQU0sRUFIQTtBQUlOQyxnQkFBUyxFQUpIO0FBS05DLGtCQUFXLEtBTEw7QUFNTkMsbUJBQVksS0FOTjtBQU9OQyxjQUFPO0FBUEQsSyxRQVVQQyxRLEdBQVcsRSxRQUlYQyxPLEdBQVU7QUFDVEMsbUJBRFMsMkJBQ007QUFDZCxZQUFJQyxPQUFPLElBQVg7QUFDQUEsYUFBS1QsT0FBTCxHQUFlLEtBQWY7QUFDQSxPQUpRO0FBS1RVLGlCQUxTLHlCQUtJO0FBQ1YsYUFBS1AsVUFBTCxHQUFrQixJQUFsQjtBQUNBLGFBQUtDLFdBQUwsR0FBbUIsS0FBbkI7QUFDRixPQVJRO0FBU1RPLGlCQVRTLHlCQVNJO0FBQ1YsYUFBS1IsVUFBTCxHQUFrQixLQUFsQjtBQUNBLGFBQUtDLFdBQUwsR0FBbUIsSUFBbkI7QUFDRixPQVpRO0FBYVRRLG1CQWJTLHlCQWFLQyxDQWJMLEVBYU87QUFDZixhQUFLWixLQUFMLEdBQWFZLEVBQUVDLE1BQUYsQ0FBU0MsS0FBdEI7QUFDQSxPQWZRO0FBZ0JUQyxzQkFoQlMsNEJBZ0JRSCxDQWhCUixFQWdCVTtBQUNsQixhQUFLWCxRQUFMLEdBQWdCVyxFQUFFQyxNQUFGLENBQVNDLEtBQXpCO0FBQ0EsT0FsQlE7QUFtQlRFLFdBbkJTLG1CQW1CRjtBQUNOLFlBQUlSLE9BQU8sSUFBWDtBQUNBLFlBQUlTLE9BQU8seUNBQVg7QUFDQSxZQUFHQSxLQUFLQyxJQUFMLENBQVVWLEtBQUtSLEtBQWYsQ0FBSCxFQUF5QjtBQUN2QixjQUFJbUIsU0FBUztBQUNYQyxzQkFBU1osS0FBS1IsS0FESDtBQUVYQyxzQkFBU08sS0FBS1AsUUFGSDtBQUdYRyxvQkFBT0ksS0FBS0o7QUFIRCxXQUFiO0FBS0EseUJBQUtpQixPQUFMLENBQWE7QUFDVkMsaUJBQUssMEJBREs7QUFFVnpCLGtCQUFNc0IsTUFGSTtBQUdWSSxvQkFBUTtBQUNOLDhCQUFnQjtBQURWLGFBSEU7QUFNVkMsb0JBQVEsTUFORTtBQU9WQyxxQkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCLGtCQUFHQSxJQUFJN0IsSUFBSixJQUFVLFNBQWIsRUFBdUI7QUFDckIsK0JBQUs4QixjQUFMLENBQW9CLFVBQXBCLEVBQStCbkIsS0FBS1IsS0FBcEM7QUFDQSwrQkFBSzRCLFNBQUwsQ0FBZTtBQUNaTix1QkFBSztBQURPLGlCQUFmO0FBR0QsZUFMRCxNQUtLO0FBQ0gsK0JBQUtPLFNBQUwsQ0FBZTtBQUNkQyx5QkFBTyxPQURPO0FBRWRDLHlCQUFNLHFCQUZRO0FBR2RDLDRCQUFVO0FBSEksaUJBQWY7QUFLRDtBQUVGO0FBckJTLFdBQWI7QUF1QkQsU0E3QkQsTUE2Qks7QUFDRix5QkFBS0gsU0FBTCxDQUFlO0FBQ2RDLG1CQUFPLFFBRE87QUFFZEMsbUJBQU0scUJBRlE7QUFHZEMsc0JBQVU7QUFISSxXQUFmO0FBS0Y7QUFDRDtBQTFEUSxLOzs7OzsyQkE2REhDLE8sRUFBUztBQUNiLFVBQUl6QixPQUFPLElBQVg7QUFDQSxVQUFHeUIsUUFBUUMsSUFBUixLQUFlQyxTQUFsQixFQUE0QixDQUUzQixDQUZELE1BRUs7QUFDSjNCLGFBQUtKLE1BQUwsR0FBYzZCLFFBQVFDLElBQXRCO0FBQ0E7QUFDRixXQUFLRSxPQUFMLENBQWFDLFdBQWIsQ0FBeUIsVUFBVXZDLFFBQVYsRUFBb0I7QUFDM0MsWUFBSUEsUUFBSixFQUFjO0FBQ1pVLGVBQUtWLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EseUJBQUs2QixjQUFMLENBQW9CLFVBQXBCLEVBQStCbkIsS0FBS1YsUUFBcEM7QUFDRDtBQUNEVSxhQUFLOEIsTUFBTDtBQUNELE9BTkQ7QUFRRDs7OztFQWxHZ0MsZUFBS0MsSTs7a0JBQW5COUMsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ0V4dE1haWwnXHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRzID0ge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgIHVzZXJJbmZvOicnLFxyXG4gICAgIG1lc3NhZ2U6JzEyMycsXHJcbiAgICAgZW1haWw6JycsXHJcbiAgICAgcGFzc3dvcmQ6JycsXHJcbiAgICAgZmlyc3RjbGljazpmYWxzZSxcclxuICAgICBzZWNvbmRjbGljazpmYWxzZSxcclxuICAgICBvcGVuaWQ6JydcclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICBjaGFuZ2VNZXNzYWdlKCl7XHJcbiAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICBzZWxmLm1lc3NhZ2UgPSAnNDU2J1xyXG4gICAgIH0sXHJcbiAgICAgZm9jdXNFSW5wdXQoKXtcclxuICAgICAgICB0aGlzLmZpcnN0Y2xpY2sgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5zZWNvbmRjbGljayA9IGZhbHNlXHJcbiAgICAgfSxcclxuICAgICBmb2N1c1BJbnB1dCgpe1xyXG4gICAgICAgIHRoaXMuZmlyc3RjbGljayA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5zZWNvbmRjbGljayA9IHRydWVcclxuICAgICB9LFxyXG4gICAgIGdldGVtYWlsSW5wdXQoZSl7XHJcbiAgICAgIHRoaXMuZW1haWwgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgIH0sXHJcbiAgICAgZ2V0cGFzc3dvcmRJbnB1dChlKXtcclxuICAgICAgdGhpcy5wYXNzd29yZCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgfSxcclxuICAgICBsb2dlcigpe1xyXG4gICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgbGV0IHBhdHQgPSAvXihcXHcpKyhcXC5cXHcrKSpAKFxcdykrKChcXC5cXHd7MiwzfSl7MSwzfSkkLztcclxuICAgICAgaWYocGF0dC50ZXN0KHNlbGYuZW1haWwpKXtcclxuICAgICAgICBsZXQgbXlkYXRhID0ge1xyXG4gICAgICAgICAgdXNlcm5hbWU6c2VsZi5lbWFpbCxcclxuICAgICAgICAgIHBhc3N3b3JkOnNlbGYucGFzc3dvcmQsXHJcbiAgICAgICAgICBvcGVuaWQ6c2VsZi5vcGVuaWRcclxuICAgICAgICB9XHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICB1cmw6ICdodHRwczovL2R5d3N3ZWIuY29tL3VzZXInLFxyXG4gICAgICAgICAgIGRhdGE6IG15ZGF0YSxcclxuICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xyXG4gICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgaWYocmVzLmRhdGE9PVwic3VjY2Vzc1wiKXtcclxuICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYyhcInVzZXJuYW1lXCIsc2VsZi5lbWFpbClcclxuICAgICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xyXG4gICAgICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvaW5ib3gnXHJcbiAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfotKblj7fkuI3mraPnoa4nLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2U6Jy4uL2Fzc2V0cy93X2NoYS5wbmcnLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfpgq7nrrHlnLDlnYDplJnor68nLFxyXG4gICAgICAgICAgaW1hZ2U6Jy4uL2Fzc2V0cy93X2NoYS5wbmcnLFxyXG4gICAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgIGlmKG9wdGlvbnMub3BpZD09PXVuZGVmaW5lZCl7XHJcblxyXG4gICAgICAgfWVsc2V7XHJcbiAgICAgICAgc2VsZi5vcGVuaWQgPSBvcHRpb25zLm9waWRcclxuICAgICAgIH1cclxuICAgICAgdGhpcy4kcGFyZW50LmdldFVzZXJJbmZvKGZ1bmN0aW9uICh1c2VySW5mbykge1xyXG4gICAgICAgIGlmICh1c2VySW5mbykge1xyXG4gICAgICAgICAgc2VsZi51c2VySW5mbyA9IHVzZXJJbmZvXHJcbiAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKFwidXNlckluZm9cIixzZWxmLnVzZXJJbmZvKVxyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgIH0pXHJcbiAgICAgIFxyXG4gICAgfVxyXG4gIH1cclxuIl19