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

var mailist = function (_wepy$page) {
  _inherits(mailist, _wepy$page);

  function mailist() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, mailist);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = mailist.__proto__ || Object.getPrototypeOf(mailist)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: 'ExtMail'
    }, _this.components = {}, _this.data = {
      MailList: '',
      bMailList: '',
      demo1: [],
      isSearch: false,
      fminput: '',
      SelectFolderName: '',
      folderid: '',
      allselect: false,
      folders: '',
      action: [{ id: 0, name: '标为已读' }, { id: 1, name: '标为未读' }],
      clearSelect: true
    }, _this.computed = {
      SmailLength: function SmailLength() {
        return this.demo1.length;
      },
      clearSelect: function clearSelect() {
        if (this.demo1.length > 0) {
          return true;
        } else {
          return false;
        }
      }
    }, _this.methods = {
      czMail: function czMail() {
        var self = this;

        if (self.isSearch) {
          self.MailList = self.bMailList;
          self.isSearch = false;
        } else {
          var findname = self.fminput;
          var arr = [];
          self.bMailList = self.MailList;
          self.MailList.forEach(function (item) {
            if (findname == item.from.email || findname == item.from.name) {
              arr.push(item);
            }
          });
          self.MailList = arr;
          self.isSearch = true;
        }
      },
      back: function back() {
        _wepy2.default.navigateBack({
          delta: 1
        });
      },
      getsearchInput: function getsearchInput(e) {
        this.fminput = e.detail.value;
      },
      AllSelect: function AllSelect() {
        var self = this;
        self.allselect = !self.allselect;
        if (self.allselect == true) {
          self.MailList.forEach(function (item) {
            if (item.check == false) {
              self.demo1.push(item);
            }
            item.check = true;
          });
        } else {
          self.MailList.forEach(function (item) {
            item.check = false;
            self.demo1.splice(0, self.demo1.length);
          });
        }
      },
      changeCheck: function changeCheck(e) {
        var self = this;
        var sy = e.target.dataset.index;
        if (self.MailList[sy].check) {
          var vemail = void 0;
          self.MailList.forEach(function (item, index) {
            if (sy == index) {
              vemail = item.from.email;
            }
          });
          self.demo1.forEach(function (item, index) {
            if (vemail == item.from.email) {
              self.demo1.splice(index, 1);
            }
          });
        } else {
          self.demo1.push(self.MailList[sy]);
        }
        if (self.demo1.length !== self.MailList.length) {
          self.allselect = false;
        } else {
          self.allselect = true;
        }
        self.MailList[sy].check = !self.MailList[sy].check;
      },
      showaction: function showaction(e) {
        var sy = e.detail.value;
        var self = this;
        var folderid = self.folderid;
        if (self.demo1.length < 1) {
          _wepy2.default.showToast({
            title: '请选择邮件',
            image: '../assets/w_cha.png',
            duration: 1000
          });
        } else {
          var read;
          if (self.action[sy].id == 0) {
            read = true;
          } else {
            read = false;
          }
          self.demo1.forEach(function (item) {
            item.attr.read = read;
            var mydata = {
              msg: {
                folder_id: folderid,
                msg_id: item.msg_id
              },
              read: read
            };
            _wepy2.default.request({
              url: 'https://dywsweb.com/set_read',
              data: mydata,
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'POST',
              success: function success(res) {
                if (res.data == "success") {
                  _wepy2.default.showToast({
                    title: '操作成功',
                    duration: 1000
                  });
                }
              }
            });
          });
        }
      },
      Delmail: function Delmail(e) {
        var self = this;
        var folderid = self.folderid;
        if (self.demo1.length < 1) {
          _wepy2.default.showToast({
            title: '请选择邮件',
            image: '../assets/w_cha.png',
            duration: 1000
          });
        } else {
          self.demo1.forEach(function (item) {
            var mydata = {
              msg: {
                folder_id: folderid,
                msg_id: item.msg_id
              }
            };
            _wepy2.default.request({
              url: 'https://dywsweb.com/msg_delete_actual',
              data: mydata,
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'POST',
              success: function success(res) {
                if (res.data == 'success') {
                  _wepy2.default.showToast({
                    title: '操作成功',
                    duration: 1000
                  });
                }
              }
            });
          });
        }
      },
      move: function move(e) {
        var self = this;
        var folderid = self.folderid;
        var sy = e.detail.value;
        var ftd = self.folders[sy].id;
        if (self.demo1.length > 0) {
          self.demo1.forEach(function (item) {
            var mvdata = {
              folder_id_target: ftd,
              msg: {
                folder_id: folderid,
                msg_id: item.msg_id
              }
            };
            _wepy2.default.request({
              url: 'https://dywsweb.com/msg_move',
              data: mvdata,
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'POST',
              success: function success(res) {
                if (res.data == 'success') {
                  _wepy2.default.showToast({
                    title: '操作成功',
                    duration: 1000
                  });
                }
              }
            });
          });
        } else {
          _wepy2.default.showToast({
            title: '请选择邮件',
            image: '../assets/w_cha.png',
            duration: 1000
          });
        }
      },
      clear: function clear() {
        var self = this;
        self.clearSelect = true;
        self.allselect = false;
        self.demo1.splice(0, self.demo1.length);
        self.MailList.forEach(function (item) {
          item.check = false;
        });
      },
      getMailInfo: function getMailInfo(e) {
        var self = this;
        var folderid = self.folderid;
        var foldername = self.SelectFolderName;
        var msgid = e.currentTarget.dataset.msgid;
        _wepy2.default.navigateTo({
          url: '/pages/mailinfo?folderid=' + folderid + '&foldername=' + foldername + '&msgid=' + msgid
        });
      },
      pageTurnRight: function pageTurnRight() {},
      pageTurnLeft: function pageTurnLeft() {}
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(mailist, [{
    key: 'onLoad',
    value: function onLoad(options) {
      var self = this;
      _wepy2.default.showLoading({
        title: '加载中'
      });
      self.SelectFolderName = options.foldername;
      self.folderid = options.folderid;
      var id = options.folderid;
      var page = options.page;
      var perpage = options.perpage;
      var sort = options.sort;
      var category = options.category;
      _wepy2.default.setStorageSync("folderid", id);
      var mydata = {
        category: category,
        id: id,
        page: page,
        perpage: perpage,
        sort: sort
      };
      _wepy2.default.request({
        url: 'https://dywsweb.com/getmaillist',
        data: mydata,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function success(res) {

          self.MailList = res.data;
          self.$apply();
          self.MailList.forEach(function (item) {
            item.check = false;
          });
          _wepy2.default.hideLoading();
        }
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
        }
      });
    }
  }]);

  return mailist;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(mailist , 'pages/maillist'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haWxsaXN0LmpzIl0sIm5hbWVzIjpbIm1haWxpc3QiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsImRhdGEiLCJNYWlsTGlzdCIsImJNYWlsTGlzdCIsImRlbW8xIiwiaXNTZWFyY2giLCJmbWlucHV0IiwiU2VsZWN0Rm9sZGVyTmFtZSIsImZvbGRlcmlkIiwiYWxsc2VsZWN0IiwiZm9sZGVycyIsImFjdGlvbiIsImlkIiwibmFtZSIsImNsZWFyU2VsZWN0IiwiY29tcHV0ZWQiLCJTbWFpbExlbmd0aCIsImxlbmd0aCIsIm1ldGhvZHMiLCJjek1haWwiLCJzZWxmIiwiZmluZG5hbWUiLCJhcnIiLCJmb3JFYWNoIiwiaXRlbSIsImZyb20iLCJlbWFpbCIsInB1c2giLCJiYWNrIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJnZXRzZWFyY2hJbnB1dCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsIkFsbFNlbGVjdCIsImNoZWNrIiwic3BsaWNlIiwiY2hhbmdlQ2hlY2siLCJzeSIsInRhcmdldCIsImRhdGFzZXQiLCJpbmRleCIsInZlbWFpbCIsInNob3dhY3Rpb24iLCJzaG93VG9hc3QiLCJ0aXRsZSIsImltYWdlIiwiZHVyYXRpb24iLCJyZWFkIiwiYXR0ciIsIm15ZGF0YSIsIm1zZyIsImZvbGRlcl9pZCIsIm1zZ19pZCIsInJlcXVlc3QiLCJ1cmwiLCJoZWFkZXIiLCJtZXRob2QiLCJzdWNjZXNzIiwicmVzIiwiRGVsbWFpbCIsIm1vdmUiLCJmdGQiLCJtdmRhdGEiLCJmb2xkZXJfaWRfdGFyZ2V0IiwiY2xlYXIiLCJnZXRNYWlsSW5mbyIsImZvbGRlcm5hbWUiLCJtc2dpZCIsImN1cnJlbnRUYXJnZXQiLCJuYXZpZ2F0ZVRvIiwicGFnZVR1cm5SaWdodCIsInBhZ2VUdXJuTGVmdCIsIm9wdGlvbnMiLCJzaG93TG9hZGluZyIsInBhZ2UiLCJwZXJwYWdlIiwic29ydCIsImNhdGVnb3J5Iiwic2V0U3RvcmFnZVN5bmMi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STNELElBQXBCO0FBQ0FtQixlQUFLNkQsTUFBTDtBQUNBN0QsZUFBS2xCLFFBQUwsQ0FBY3FCLE9BQWQsQ0FBc0IsVUFBQ0MsSUFBRCxFQUFRO0FBQzNCQSxpQkFBS1ksS0FBTCxHQUFhLEtBQWI7QUFDRixXQUZEO0FBR0EseUJBQUs4QyxXQUFMO0FBQ0Q7QUFmUSxPQUFiO0FBaUJDLHFCQUFLM0IsT0FBTCxDQUFhO0FBQ1ZDLGFBQUssZ0NBREs7QUFFVnZELGNBQU0sRUFGSTtBQUlWd0QsZ0JBQVE7QUFDTiwwQkFBZ0I7QUFEVixTQUpFO0FBT1ZDLGdCQUFRLE1BUEU7QUFRVkMsaUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN2QnhDLGVBQUtWLE9BQUwsR0FBZWtELElBQUkzRCxJQUFuQjtBQUVBO0FBWFMsT0FBYjtBQWFIOzs7O0VBL1NrQyxlQUFLMkUsSTs7a0JBQXJCL0UsTyIsImZpbGUiOiJtYWlsbGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIG1haWxpc3QgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnRXh0TWFpbCdcclxuICAgIH1cclxuICAgIGNvbXBvbmVudHMgPSB7XHJcblxyXG4gICAgfSBcclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgIE1haWxMaXN0OicnLFxyXG4gICAgIGJNYWlsTGlzdDonJyxcclxuICAgICBkZW1vMTpbXSxcclxuICAgICBpc1NlYXJjaDpmYWxzZSxcclxuICAgICBmbWlucHV0OicnLFxyXG4gICAgIFNlbGVjdEZvbGRlck5hbWU6JycsXHJcbiAgICAgZm9sZGVyaWQ6JycsXHJcbiAgICAgYWxsc2VsZWN0OmZhbHNlLFxyXG4gICAgIGZvbGRlcnM6JycsXHJcbiAgICAgYWN0aW9uOlt7aWQ6MCxuYW1lOifmoIfkuLrlt7Lor7snfSx7aWQ6MSxuYW1lOifmoIfkuLrmnKror7snfV0sXHJcbiAgICAgY2xlYXJTZWxlY3Q6dHJ1ZSxcclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgU21haWxMZW5ndGgoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5kZW1vMS5sZW5ndGhcclxuICAgICAgfSxcclxuICAgICAgY2xlYXJTZWxlY3QoKXtcclxuICAgICAgICBpZih0aGlzLmRlbW8xLmxlbmd0aD4wKXtcclxuICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICBjek1haWwoKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuXHJcbiAgICAgICAgaWYoc2VsZi5pc1NlYXJjaCl7XHJcbiAgICAgICAgICBzZWxmLk1haWxMaXN0ID0gc2VsZi5iTWFpbExpc3RcclxuICAgICAgICAgIHNlbGYuaXNTZWFyY2ggPSBmYWxzZVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgbGV0IGZpbmRuYW1lID0gc2VsZi5mbWlucHV0XHJcbiAgICAgICAgICBsZXQgYXJyPVtdO1xyXG4gICAgICAgICAgc2VsZi5iTWFpbExpc3QgPSBzZWxmLk1haWxMaXN0XHJcbiAgICAgICAgICBzZWxmLk1haWxMaXN0LmZvckVhY2goKGl0ZW0pPT57XHJcbiAgICAgICAgICAgIGlmKGZpbmRuYW1lPT1pdGVtLmZyb20uZW1haWx8fGZpbmRuYW1lPT1pdGVtLmZyb20ubmFtZSl7XHJcbiAgICAgICAgICAgICAgYXJyLnB1c2goaXRlbSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHNlbGYuTWFpbExpc3QgPSBhcnJcclxuICAgICAgICAgIHNlbGYuaXNTZWFyY2ggPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBiYWNrKCl7XHJcbiAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe1xyXG4gICAgICAgICAgZGVsdGE6IDFcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG4gICAgICBnZXRzZWFyY2hJbnB1dChlKXtcclxuICAgICAgIHRoaXMuZm1pbnB1dCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIH0sXHJcbiAgICAgIEFsbFNlbGVjdCgpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHNlbGYuYWxsc2VsZWN0ID0gIXNlbGYuYWxsc2VsZWN0XHJcbiAgICAgICAgaWYoc2VsZi5hbGxzZWxlY3Q9PXRydWUpe1xyXG4gICAgICAgICAgc2VsZi5NYWlsTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgICAgICBpZihpdGVtLmNoZWNrPT1mYWxzZSl7XHJcbiAgICAgICAgICAgICAgc2VsZi5kZW1vMS5wdXNoKGl0ZW0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaXRlbS5jaGVjayA9IHRydWVcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICBzZWxmLk1haWxMaXN0LmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgICAgIGl0ZW0uY2hlY2sgPSBmYWxzZVxyXG4gICAgICAgICAgICBzZWxmLmRlbW8xLnNwbGljZSgwLHNlbGYuZGVtbzEubGVuZ3RoKVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgIH0sXHJcbiAgICAgIGNoYW5nZUNoZWNrKGUpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIGxldCBzeSA9IGUudGFyZ2V0LmRhdGFzZXQuaW5kZXhcclxuICAgICAgICBpZihzZWxmLk1haWxMaXN0W3N5XS5jaGVjayl7XHJcbiAgICAgICAgICBsZXQgdmVtYWlsO1xyXG4gICAgICAgICAgc2VsZi5NYWlsTGlzdC5mb3JFYWNoKChpdGVtLGluZGV4KT0+e1xyXG4gICAgICAgICAgICBpZihzeT09aW5kZXgpe1xyXG4gICAgICAgICAgICAgIHZlbWFpbCA9IGl0ZW0uZnJvbS5lbWFpbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgc2VsZi5kZW1vMS5mb3JFYWNoKChpdGVtLGluZGV4KT0+e1xyXG4gICAgICAgICAgICBpZih2ZW1haWw9PWl0ZW0uZnJvbS5lbWFpbCl7XHJcbiAgICAgICAgICAgICAgc2VsZi5kZW1vMS5zcGxpY2UoaW5kZXgsMSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIHNlbGYuZGVtbzEucHVzaChzZWxmLk1haWxMaXN0W3N5XSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc2VsZi5kZW1vMS5sZW5ndGghPT1zZWxmLk1haWxMaXN0Lmxlbmd0aCl7XHJcbiAgICAgICAgICBzZWxmLmFsbHNlbGVjdCA9IGZhbHNlXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICBzZWxmLmFsbHNlbGVjdCA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5NYWlsTGlzdFtzeV0uY2hlY2sgPSAhc2VsZi5NYWlsTGlzdFtzeV0uY2hlY2tcclxuICAgICAgfSxcclxuICAgICAgc2hvd2FjdGlvbihlKXtcclxuICAgICAgICBsZXQgc3kgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcyBcclxuICAgICAgICBsZXQgZm9sZGVyaWQgPSBzZWxmLmZvbGRlcmlkXHJcbiAgICAgICAgaWYoc2VsZi5kZW1vMS5sZW5ndGg8MSl7XHJcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn6K+36YCJ5oup6YKu5Lu2JyxcclxuICAgICAgICAgICAgaW1hZ2U6Jy4uL2Fzc2V0cy93X2NoYS5wbmcnLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIHZhciByZWFkO1xyXG4gICAgICAgICAgaWYoc2VsZi5hY3Rpb25bc3ldLmlkPT0wKXtcclxuICAgICAgICAgICByZWFkID0gdHJ1ZVxyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJlYWQgPSBmYWxzZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc2VsZi5kZW1vMS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgICAgICAgIGl0ZW0uYXR0ci5yZWFkID0gcmVhZFxyXG4gICAgICAgICAgICAgIGxldCBteWRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBtc2c6e1xyXG4gICAgICAgICAgICAgICAgICBmb2xkZXJfaWQ6Zm9sZGVyaWQsXHJcbiAgICAgICAgICAgICAgICAgIG1zZ19pZDppdGVtLm1zZ19pZCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICByZWFkOnJlYWRcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9keXdzd2ViLmNvbS9zZXRfcmVhZCcsXHJcbiAgICAgICAgICAgICAgICAgZGF0YTogbXlkYXRhLFxyXG4gICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICBpZihyZXMuZGF0YT09XCJzdWNjZXNzXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5pON5L2c5oiQ5YqfJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9KTsgIFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9IFxyXG4gICAgICB9LFxyXG4gICAgICBEZWxtYWlsKGUpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIGxldCBmb2xkZXJpZCA9IHNlbGYuZm9sZGVyaWRcclxuICAgICAgICBpZihzZWxmLmRlbW8xLmxlbmd0aDwxKXtcclxuICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn6K+36YCJ5oup6YKu5Lu2JyxcclxuICAgICAgICAgICAgaW1hZ2U6Jy4uL2Fzc2V0cy93X2NoYS5wbmcnLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIHNlbGYuZGVtbzEuZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAgICAgbGV0IG15ZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgbXNnOntcclxuICAgICAgICAgICAgICAgICBmb2xkZXJfaWQ6Zm9sZGVyaWQsXHJcbiAgICAgICAgICAgICAgICAgbXNnX2lkOml0ZW0ubXNnX2lkLFxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZHl3c3dlYi5jb20vbXNnX2RlbGV0ZV9hY3R1YWwnLFxyXG4gICAgICAgICAgICAgIGRhdGE6IG15ZGF0YSxcclxuICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICBpZihyZXMuZGF0YT09J3N1Y2Nlc3MnKXtcclxuICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmk43kvZzmiJDlip8nLFxyXG4gICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgbW92ZShlKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgbGV0IGZvbGRlcmlkID0gc2VsZi5mb2xkZXJpZFxyXG4gICAgICAgIGxldCBzeSA9IGUuZGV0YWlsLnZhbHVlIFxyXG4gICAgICAgIGxldCBmdGQgPSBzZWxmLmZvbGRlcnNbc3ldLmlkICBcclxuICAgICAgICBpZihzZWxmLmRlbW8xLmxlbmd0aD4wKXtcclxuICAgICAgICBzZWxmLmRlbW8xLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgICBsZXQgbXZkYXRhID0ge1xyXG4gICAgICAgICAgICBmb2xkZXJfaWRfdGFyZ2V0OmZ0ZCxcclxuICAgICAgICAgICAgbXNnOntcclxuICAgICAgICAgICAgICBmb2xkZXJfaWQ6Zm9sZGVyaWQsXHJcbiAgICAgICAgICAgICAgbXNnX2lkOml0ZW0ubXNnX2lkLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICB1cmw6ICdodHRwczovL2R5d3N3ZWIuY29tL21zZ19tb3ZlJyxcclxuICAgICAgICAgICBkYXRhOiBtdmRhdGEsXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgIGlmKHJlcy5kYXRhPT0nc3VjY2Vzcycpe1xyXG4gICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogJ+aTjeS9nOaIkOWKnycsXHJcbiAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICB9KTtcclxuICAgICAgfSlcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7fpgInmi6npgq7ku7YnLFxyXG4gICAgICAgICAgaW1hZ2U6Jy4uL2Fzc2V0cy93X2NoYS5wbmcnLFxyXG4gICAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGNsZWFyKCl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYuY2xlYXJTZWxlY3QgPSB0cnVlO1xyXG4gICAgICAgIHNlbGYuYWxsc2VsZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgc2VsZi5kZW1vMS5zcGxpY2UoMCxzZWxmLmRlbW8xLmxlbmd0aCk7XHJcbiAgICAgICAgc2VsZi5NYWlsTGlzdC5mb3JFYWNoKChpdGVtKT0+e1xyXG4gICAgICAgICAgaXRlbS5jaGVjayA9IGZhbHNlXHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuICAgICAgZ2V0TWFpbEluZm8oZSl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgbGV0IGZvbGRlcmlkID0gc2VsZi5mb2xkZXJpZDtcclxuICAgICAgICBsZXQgZm9sZGVybmFtZSA9IHNlbGYuU2VsZWN0Rm9sZGVyTmFtZTtcclxuICAgICAgICBsZXQgbXNnaWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5tc2dpZFxyXG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgIHVybDogJy9wYWdlcy9tYWlsaW5mbz9mb2xkZXJpZD0nK2ZvbGRlcmlkKycmZm9sZGVybmFtZT0nK2ZvbGRlcm5hbWUrJyZtc2dpZD0nK21zZ2lkXHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuICAgICAgcGFnZVR1cm5SaWdodCgpe1xyXG4gICAgICAgIFxyXG4gICAgICB9LFxyXG4gICAgICBwYWdlVHVybkxlZnQoKXtcclxuICAgICAgICBcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgd2VweS5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcclxuICAgICAgIH0pXHJcbiAgICAgIHNlbGYuU2VsZWN0Rm9sZGVyTmFtZSA9IG9wdGlvbnMuZm9sZGVybmFtZVxyXG4gICAgICBzZWxmLmZvbGRlcmlkID0gb3B0aW9ucy5mb2xkZXJpZFxyXG4gICAgICBsZXQgaWQgPSBvcHRpb25zLmZvbGRlcmlkXHJcbiAgICAgIGxldCBwYWdlID0gb3B0aW9ucy5wYWdlXHJcbiAgICAgIGxldCBwZXJwYWdlID0gb3B0aW9ucy5wZXJwYWdlXHJcbiAgICAgIGxldCBzb3J0ID0gb3B0aW9ucy5zb3J0XHJcbiAgICAgIGxldCBjYXRlZ29yeSA9IG9wdGlvbnMuY2F0ZWdvcnlcclxuICAgICAgd2VweS5zZXRTdG9yYWdlU3luYyhcImZvbGRlcmlkXCIsaWQpXHJcbiAgICAgIGxldCBteWRhdGEgPSB7XHJcbiAgICAgICAgY2F0ZWdvcnk6Y2F0ZWdvcnksXHJcbiAgICAgICAgaWQ6aWQsXHJcbiAgICAgICAgcGFnZTpwYWdlLFxyXG4gICAgICAgIHBlcnBhZ2U6cGVycGFnZSxcclxuICAgICAgICBzb3J0OnNvcnRcclxuICAgICAgfVxyXG4gICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICB1cmw6ICdodHRwczovL2R5d3N3ZWIuY29tL2dldG1haWxsaXN0JyxcclxuICAgICAgICAgICBkYXRhOiBteWRhdGEsXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuXHJcbiAgICAgICAgICAgICBzZWxmLk1haWxMaXN0ID0gcmVzLmRhdGFcclxuICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgIHNlbGYuTWFpbExpc3QuZm9yRWFjaCgoaXRlbSk9PntcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgIH0pO1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9keXdzd2ViLmNvbS9nZXRmb2xkZXJzJyxcclxuICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgfSxcclxuICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xyXG4gICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICBzZWxmLmZvbGRlcnMgPSByZXMuZGF0YVxyXG5cclxuICAgICAgICAgICB9XHJcbiAgICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuIl19