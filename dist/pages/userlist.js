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

var userlist = function (_wepy$page) {
  _inherits(userlist, _wepy$page);

  function userlist() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, userlist);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = userlist.__proto__ || Object.getPrototypeOf(userlist)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: 'ExtMail'
    }, _this.components = {}, _this.data = {
      findInput: '',
      Grouplist: '',
      OnlyOnceFind: false,
      demo1: [],
      allselect: false
    }, _this.computed = {
      showUserInfo: function showUserInfo() {
        for (var i = 0; i < this.Grouplist.length; i++) {
          if (this.Grouplist[i].check) {
            return this.Grouplist[i].user;
          }
        }
      },
      grouptitle: function grouptitle() {
        for (var i = 0; i < this.Grouplist.length; i++) {
          if (this.Grouplist[i].check) {
            return this.Grouplist[i].name;
          }
        }
      },
      UserLength: function UserLength() {
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
      clear: function clear() {
        var self = this;
        var keyIndex = void 0;
        self.clearSelect = true;
        self.allselect = false;
        self.demo1.splice(0, self.demo1.length);
        for (var i = 0; i < this.Grouplist.length; i++) {
          if (this.Grouplist[i].check) {
            keyIndex = i;
          }
        }
        self.Grouplist[keyIndex].user.forEach(function (item) {
          item.check = false;
        });
      },
      getsearchInput: function getsearchInput(e) {
        this.findInput = e.detail.value;
      },
      finduser: function finduser() {
        var self = this;
        var findArr = [];
        var fmuban = {
          check: true,
          name: '查找成员',
          user: []

        };
        var username = self.findInput;
        var farr = [].concat(self.Grouplist[0].user);
        farr.forEach(function (item) {
          if (username == item.username || username == item.email) {
            var finduser = {
              username: item.username,
              email: item.email,
              check: false
            };
            fmuban.user.push(finduser);
          }
        });
        self.demo1.splice(0, self.demo1.length);
        self.allselect = false;
        if (fmuban.user.length !== 0) {
          self.Grouplist.forEach(function (item) {
            item.check = false;
          });
          if (self.OnlyOnceFind) {
            self.Grouplist.splice(self.Grouplist.length - 1, 1);
            self.Grouplist.push(fmuban);
          } else {
            self.Grouplist.push(fmuban);
            self.OnlyOnceFind = true;
          }
        } else {
          _wepy2.default.showToast({
            title: '查无此成员',
            image: '../assets/w_cha.png',
            duration: 1000
          });
        }
      },
      getuserlist: function getuserlist(e) {
        var self = this;
        var sy = e.currentTarget.dataset.index;
        self.grouptitle = e.currentTarget.dataset.name;
        self.Grouplist.forEach(function (item) {
          item.check = false;
        });
        self.Grouplist[sy].check = true;
        self.demo1.splice(0, self.demo1.length);
        self.allselect = false;
        self.Grouplist[sy].user.forEach(function (item) {
          item.check = false;
        });
      },
      changeCheck: function changeCheck(e) {
        var self = this;
        var sy = e.target.dataset.index;
        var keyIndex = void 0;
        for (var i = 0; i < this.Grouplist.length; i++) {
          if (this.Grouplist[i].check) {
            keyIndex = i;
          }
        }
        if (self.showUserInfo[sy].check) {
          var dmail = void 0;
          self.showUserInfo.forEach(function (item, index) {
            if (sy == index) {
              dmail = item.email;
            }
          });
          self.Grouplist[keyIndex].user.forEach(function (item) {
            if (dmail == item.email) {
              item.check = false;
            }
          });
          self.demo1.forEach(function (item, index) {
            if (dmail == item.email) {
              self.demo1.splice(index, 1);
            }
          });
        } else {
          var pemail = void 0;
          self.showUserInfo.forEach(function (item, index) {
            if (sy == index) {
              pemail = item.email;
            }
          });
          self.Grouplist[keyIndex].user.forEach(function (item) {
            if (pemail == item.email) {
              item.check = true;
              self.demo1.push(item);
            }
          });
        }
        if (self.demo1.length !== self.showUserInfo.length) {
          self.allselect = false;
        } else {
          self.allselect = true;
        }
      },
      AllSelect: function AllSelect() {
        var self = this;
        var keyIndex = void 0;
        self.allselect = !self.allselect;
        for (var i = 0; i < this.Grouplist.length; i++) {
          if (this.Grouplist[i].check) {
            keyIndex = i;
          }
        }
        self.Grouplist[keyIndex].user.forEach(function (item) {
          if (self.allselect == true) {
            if (item.check == false) {
              self.demo1.push(item);
            }
            item.check = true;
          } else {
            item.check = false;
            self.demo1.splice(0, self.demo1.length);
          }
        });
      },
      writeLetter: function writeLetter() {
        var self = this;
        if (self.demo1.length < 1) {
          _wepy2.default.showToast({
            title: '请选择成员',
            image: '../assets/w_cha.png',
            duration: 1000
          });
        } else {
          var option = {
            people: [],
            opr: ''
          };
          self.demo1.forEach(function (item) {
            var umuban = {
              username: item.username,
              email: item.email,
              sjCheck: false,
              ccCheck: false,
              bccCheck: false
            };
            option.people.push(umuban);
          });

          var options = JSON.stringify(option);
          _wepy2.default.setStorageSync('options', options);
          _wepy2.default.switchTab({
            url: '/pages/write'
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(userlist, [{
    key: 'onShow',
    value: function onShow() {
      var self = this;
      _wepy2.default.showLoading({
        title: '加载中'
      });
      _wepy2.default.removeStorageSync('options');
      self.demo1 = [];
      self.allselect = false;
      _wepy2.default.request({
        url: 'https://dywsweb.com/getuserlist',
        data: {},
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function success(res) {
          var arr = [];
          var farr = [].concat(res.data.persons.fields);
          var garr = [].concat(res.data.groups);
          var unarr = [];
          var ungroup = [];
          var unfarr = [].concat(res.data.persons.fields);
          var ungarr = [].concat(res.data.groups);
          garr.forEach(function (item) {
            var gmuban = {
              name: '',
              check: false,
              user: []
            };
            gmuban.name = item.name;
            for (var i = 0; i < farr.length; i++) {
              for (var j = 0; j < item.members.length; j++) {
                if (farr[i][1] == item.members[j]) {
                  var umuban = {
                    username: farr[i][0],
                    email: farr[i][1],
                    check: false
                  };
                  gmuban.user.push(umuban);
                }
              }
            }
            arr.push(gmuban);
          });
          ungarr.forEach(function (item, index) {
            for (var i = 0; i < item.members.length; i++) {
              for (var j = 0; j < unfarr.length; j++) {
                if (unfarr[j][1] == item.members[i]) {
                  unfarr.splice(j, 1);
                }
              }
            }
          });
          var ungdata = {
            name: '未分组成员',
            user: [],
            check: false
          };
          unfarr.forEach(function (item, index) {
            var data = {
              username: item[0],
              email: item[1],
              check: false
            };
            ungdata.user.push(data);
          });

          arr.push(ungdata);
          var allmuban = {
            name: '所有成员',
            check: true,
            user: []
          };
          farr.forEach(function (item, index) {
            var allusermuban = {
              username: item[0],
              email: item[1],
              check: false
            };
            allmuban.user.push(allusermuban);
          });
          arr.unshift(allmuban);
          self.Grouplist = arr;
          self.$apply();
          _wepy2.default.hideLoading();
        }
      });
    }
  }]);

  return userlist;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(userlist , 'pages/userlist'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXJsaXN0LmpzIl0sIm5hbWVzIjpbInVzZXJsaXN0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJkYXRhIiwiZmluZElucHV0IiwiR3JvdXBsaXN0IiwiT25seU9uY2VGaW5kIiwiZGVtbzEiLCJhbGxzZWxlY3QiLCJjb21wdXRlZCIsInNob3dVc2VySW5mbyIsImkiLCJsZW5ndGgiLCJjaGVjayIsInVzZXIiLCJncm91cHRpdGxlIiwibmFtZSIsIlVzZXJMZW5ndGgiLCJjbGVhclNlbGVjdCIsIm1ldGhvZHMiLCJjbGVhciIsInNlbGYiLCJrZXlJbmRleCIsInNwbGljZSIsImZvckVhY2giLCJpdGVtIiwiZ2V0c2VhcmNoSW5wdXQiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJmaW5kdXNlciIsImZpbmRBcnIiLCJmbXViYW4iLCJ1c2VybmFtZSIsImZhcnIiLCJjb25jYXQiLCJlbWFpbCIsInB1c2giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImltYWdlIiwiZHVyYXRpb24iLCJnZXR1c2VybGlzdCIsInN5IiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpbmRleCIsImNoYW5nZUNoZWNrIiwidGFyZ2V0IiwiZG1haWwiLCJwZW1haWwiLCJBbGxTZWxlY3QiLCJ3cml0ZUxldHRlciIsIm9wdGlvbiIsInBlb3BsZSIsIm9wciIsInVtdWJhbiIsInNqQ2hlY2siLCJjY0NoZWNrIiwiYmNjQ2hlY2siLCJvcHRpb25zIiwiSlNPTiIsInN0cmluZ2lmeSIsInNldFN0b3JhZ2VTeW5jIiwic3dpdGNoVGFiIiwidXJsIiwic2hvd0xvYWRpbmciLCJyZW1vdmVTdG9yYWdlU3luYyIsInJlcXVlc3QiLCJoZWFkZXIiLCJtZXRob2QiLCJzdWNjZXNzIiwicmVzIiwiYXJyIiwicGVyc29ucyIsImZpZWxkcyIsImdhcnIiLCJncm91cHMiLCJ1bmFyciIsInVuZ3JvdXAiLCJ1bmZhcnIiLCJ1bmdhcnIiLCJnbXViYW4iLCJqIiwibWVtYmVycyIsInVuZ2RhdGEiLCJhbGxtdWJhbiIsImFsbHVzZXJtdWJhbiIsInVuc2hpZnQiLCIkYXBwbHkiLCJoaWRlTG9hZGluZyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLFUsR0FBYSxFLFFBSWJDLEksR0FBTztBQUNMQyxpQkFBVSxFQURMO0FBRUxDLGlCQUFVLEVBRkw7QUFHTEMsb0JBQWEsS0FIUjtBQUlMQyxhQUFNLEVBSkQ7QUFLTEMsaUJBQVU7QUFMTCxLLFFBUVBDLFEsR0FBVztBQUNUQyxrQkFEUywwQkFDSztBQUNaLGFBQUksSUFBSUMsSUFBRSxDQUFWLEVBQVlBLElBQUUsS0FBS04sU0FBTCxDQUFlTyxNQUE3QixFQUFvQ0QsR0FBcEMsRUFBd0M7QUFDdEMsY0FBRyxLQUFLTixTQUFMLENBQWVNLENBQWYsRUFBa0JFLEtBQXJCLEVBQTJCO0FBQ3pCLG1CQUFPLEtBQUtSLFNBQUwsQ0FBZU0sQ0FBZixFQUFrQkcsSUFBekI7QUFDRDtBQUNGO0FBQ0YsT0FQUTtBQVFUQyxnQkFSUyx3QkFRRztBQUNWLGFBQUksSUFBSUosSUFBRSxDQUFWLEVBQVlBLElBQUUsS0FBS04sU0FBTCxDQUFlTyxNQUE3QixFQUFvQ0QsR0FBcEMsRUFBd0M7QUFDdEMsY0FBRyxLQUFLTixTQUFMLENBQWVNLENBQWYsRUFBa0JFLEtBQXJCLEVBQTJCO0FBQ3pCLG1CQUFPLEtBQUtSLFNBQUwsQ0FBZU0sQ0FBZixFQUFrQkssSUFBekI7QUFDRDtBQUNGO0FBQ0YsT0FkUTtBQWVUQyxnQkFmUyx3QkFlRztBQUNWLGVBQU8sS0FBS1YsS0FBTCxDQUFXSyxNQUFsQjtBQUNELE9BakJRO0FBa0JUTSxpQkFsQlMseUJBa0JJO0FBQ1gsWUFBRyxLQUFLWCxLQUFMLENBQVdLLE1BQVgsR0FBa0IsQ0FBckIsRUFBdUI7QUFDckIsaUJBQU8sSUFBUDtBQUNELFNBRkQs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QkFBS0MsV0FBTDtBQUNBO0FBaEZTLE9BQWI7QUFrRkg7Ozs7RUF0VG1DLGVBQUtDLEk7O2tCQUF0QjVGLFEiLCJmaWxlIjoidXNlcmxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyB1c2VybGlzdCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdFeHRNYWlsJ1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50cyA9IHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgZmluZElucHV0OicnLFxyXG4gICAgICBHcm91cGxpc3Q6JycsXHJcbiAgICAgIE9ubHlPbmNlRmluZDpmYWxzZSxcclxuICAgICAgZGVtbzE6W10sXHJcbiAgICAgIGFsbHNlbGVjdDpmYWxzZSxcclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgc2hvd1VzZXJJbmZvKCl7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLkdyb3VwbGlzdC5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgIGlmKHRoaXMuR3JvdXBsaXN0W2ldLmNoZWNrKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuR3JvdXBsaXN0W2ldLnVzZXJcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGdyb3VwdGl0bGUoKXtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMuR3JvdXBsaXN0Lmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgaWYodGhpcy5Hcm91cGxpc3RbaV0uY2hlY2spe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5Hcm91cGxpc3RbaV0ubmFtZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgVXNlckxlbmd0aCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRlbW8xLmxlbmd0aFxyXG4gICAgICB9LFxyXG4gICAgICBjbGVhclNlbGVjdCgpe1xyXG4gICAgICAgIGlmKHRoaXMuZGVtbzEubGVuZ3RoPjApe1xyXG4gICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH0gICBcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIGNsZWFyKCl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBrZXlJbmRleDtcclxuICAgICAgICBzZWxmLmNsZWFyU2VsZWN0ID0gdHJ1ZTtcclxuICAgICAgICBzZWxmLmFsbHNlbGVjdCA9IGZhbHNlO1xyXG4gICAgICAgIHNlbGYuZGVtbzEuc3BsaWNlKDAsc2VsZi5kZW1vMS5sZW5ndGgpO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5Hcm91cGxpc3QubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICBpZih0aGlzLkdyb3VwbGlzdFtpXS5jaGVjayl7XHJcbiAgICAgICAgICAgIGtleUluZGV4ID0gaVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLkdyb3VwbGlzdFtrZXlJbmRleF0udXNlci5mb3JFYWNoKChpdGVtKT0+e1xyXG4gICAgICAgICAgaXRlbS5jaGVjayA9IGZhbHNlXHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuICAgICAgZ2V0c2VhcmNoSW5wdXQoZSl7XHJcbiAgICAgICAgdGhpcy5maW5kSW5wdXQgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB9LFxyXG4gICAgICBmaW5kdXNlcigpe1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpc1xyXG4gICAgICAgIHZhciBmaW5kQXJyID0gW11cclxuICAgICAgICB2YXIgZm11YmFuID0ge1xyXG4gICAgICAgICAgY2hlY2s6dHJ1ZSxcclxuICAgICAgICAgIG5hbWU6J+afpeaJvuaIkOWRmCcsXHJcbiAgICAgICAgICB1c2VyOltdLFxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHVzZXJuYW1lID0gc2VsZi5maW5kSW5wdXRcclxuICAgICAgICB2YXIgZmFyciA9IFtdLmNvbmNhdChzZWxmLkdyb3VwbGlzdFswXS51c2VyKTtcclxuICAgICAgICBmYXJyLmZvckVhY2goKGl0ZW0pPT57XHJcbiAgICAgICAgICBpZih1c2VybmFtZT09aXRlbS51c2VybmFtZXx8dXNlcm5hbWU9PWl0ZW0uZW1haWwpe1xyXG4gICAgICAgICAgICB2YXIgZmluZHVzZXIgPSB7XHJcbiAgICAgICAgICAgICAgdXNlcm5hbWU6aXRlbS51c2VybmFtZSxcclxuICAgICAgICAgICAgICBlbWFpbDppdGVtLmVtYWlsLFxyXG4gICAgICAgICAgICAgIGNoZWNrOmZhbHNlLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBmbXViYW4udXNlci5wdXNoKGZpbmR1c2VyKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgc2VsZi5kZW1vMS5zcGxpY2UoMCxzZWxmLmRlbW8xLmxlbmd0aClcclxuICAgICAgICBzZWxmLmFsbHNlbGVjdCA9IGZhbHNlXHJcbiAgICAgICAgaWYoZm11YmFuLnVzZXIubGVuZ3RoIT09MCl7XHJcbiAgICAgICAgICBzZWxmLkdyb3VwbGlzdC5mb3JFYWNoKChpdGVtKT0+e1xyXG4gICAgICAgICAgaXRlbS5jaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICB9KVxyXG4gICAgICAgICAgaWYoc2VsZi5Pbmx5T25jZUZpbmQpe1xyXG4gICAgICAgICAgICBzZWxmLkdyb3VwbGlzdC5zcGxpY2Uoc2VsZi5Hcm91cGxpc3QubGVuZ3RoLTEsMSlcclxuICAgICAgICAgICAgc2VsZi5Hcm91cGxpc3QucHVzaChmbXViYW4pO1xyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHNlbGYuR3JvdXBsaXN0LnB1c2goZm11YmFuKTtcclxuICAgICAgICAgICAgc2VsZi5Pbmx5T25jZUZpbmQgPSB0cnVlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+afpeaXoOatpOaIkOWRmCcsXHJcbiAgICAgICAgICAgIGltYWdlOicuLi9hc3NldHMvd19jaGEucG5nJyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBnZXR1c2VybGlzdChlKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHN5ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXhcclxuICAgICAgICBzZWxmLmdyb3VwdGl0bGUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5uYW1lXHJcbiAgICAgICAgc2VsZi5Hcm91cGxpc3QuZm9yRWFjaCgoaXRlbSk9PntcclxuICAgICAgICAgIGl0ZW0uY2hlY2sgPSBmYWxzZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgc2VsZi5Hcm91cGxpc3Rbc3ldLmNoZWNrID0gdHJ1ZVxyXG4gICAgICAgIHNlbGYuZGVtbzEuc3BsaWNlKDAsc2VsZi5kZW1vMS5sZW5ndGgpXHJcbiAgICAgICAgc2VsZi5hbGxzZWxlY3QgPSBmYWxzZVxyXG4gICAgICAgIHNlbGYuR3JvdXBsaXN0W3N5XS51c2VyLmZvckVhY2goKGl0ZW0pPT57XHJcbiAgICAgICAgICBpdGVtLmNoZWNrID0gZmFsc2VcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG4gICAgICBjaGFuZ2VDaGVjayhlKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICBsZXQgc3kgPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4ICAgXHJcbiAgICAgICAgbGV0IGtleUluZGV4O1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5Hcm91cGxpc3QubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICBpZih0aGlzLkdyb3VwbGlzdFtpXS5jaGVjayl7XHJcbiAgICAgICAgICAgIGtleUluZGV4ID0gaVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzZWxmLnNob3dVc2VySW5mb1tzeV0uY2hlY2spe1xyXG4gICAgICAgICAgbGV0IGRtYWlsOyAgXHJcbiAgICAgICAgICBzZWxmLnNob3dVc2VySW5mby5mb3JFYWNoKChpdGVtLGluZGV4KT0+e1xyXG4gICAgICAgICAgICBpZihzeT09aW5kZXgpeyAgIFxyXG4gICAgICAgICAgICAgIGRtYWlsID0gaXRlbS5lbWFpbCAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICBzZWxmLkdyb3VwbGlzdFtrZXlJbmRleF0udXNlci5mb3JFYWNoKChpdGVtKT0+e1xyXG4gICAgICAgICAgICAgIGlmKGRtYWlsPT1pdGVtLmVtYWlsKXtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2hlY2sgPSBmYWxzZVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIHNlbGYuZGVtbzEuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcclxuICAgICAgICAgICAgaWYoZG1haWw9PWl0ZW0uZW1haWwpe1xyXG4gICAgICAgICAgICAgIHNlbGYuZGVtbzEuc3BsaWNlKGluZGV4LDEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfWVsc2V7ICBcclxuICAgICAgICAgICAgbGV0IHBlbWFpbDtcclxuICAgICAgICAgICAgc2VsZi5zaG93VXNlckluZm8uZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcclxuICAgICAgICAgICAgICBpZihzeT09aW5kZXgpeyAgIFxyXG4gICAgICAgICAgICAgICAgcGVtYWlsID0gaXRlbS5lbWFpbCAgXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBzZWxmLkdyb3VwbGlzdFtrZXlJbmRleF0udXNlci5mb3JFYWNoKChpdGVtKT0+e1xyXG4gICAgICAgICAgICAgIGlmKHBlbWFpbD09aXRlbS5lbWFpbCl7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNoZWNrID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgc2VsZi5kZW1vMS5wdXNoKGl0ZW0pXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHNlbGYuZGVtbzEubGVuZ3RoIT09c2VsZi5zaG93VXNlckluZm8ubGVuZ3RoKXtcclxuICAgICAgICAgIHNlbGYuYWxsc2VsZWN0ID0gZmFsc2VcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIHNlbGYuYWxsc2VsZWN0ID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgQWxsU2VsZWN0KCl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBrZXlJbmRleDtcclxuICAgICAgICBzZWxmLmFsbHNlbGVjdCA9ICFzZWxmLmFsbHNlbGVjdDtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMuR3JvdXBsaXN0Lmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgaWYodGhpcy5Hcm91cGxpc3RbaV0uY2hlY2spe1xyXG4gICAgICAgICAgICBrZXlJbmRleCA9IGlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5Hcm91cGxpc3Rba2V5SW5kZXhdLnVzZXIuZm9yRWFjaCgoaXRlbSk9PntcclxuICAgICAgICAgIGlmKHNlbGYuYWxsc2VsZWN0PT10cnVlKXtcclxuICAgICAgICAgICAgaWYoaXRlbS5jaGVjaz09ZmFsc2Upe1xyXG4gICAgICAgICAgICAgIHNlbGYuZGVtbzEucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpdGVtLmNoZWNrID0gdHJ1ZVxyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGl0ZW0uY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgc2VsZi5kZW1vMS5zcGxpY2UoMCxzZWxmLmRlbW8xLmxlbmd0aClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KSBcclxuICAgICAgfSxcclxuICAgICAgd3JpdGVMZXR0ZXIoKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICBpZihzZWxmLmRlbW8xLmxlbmd0aDwxKXtcclxuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6ICfor7fpgInmi6nmiJDlkZgnLFxyXG4gICAgICAgICAgICBpbWFnZTonLi4vYXNzZXRzL3dfY2hhLnBuZycsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgbGV0IG9wdGlvbiA9IHtcclxuICAgICAgICAgICAgcGVvcGxlOltdLFxyXG4gICAgICAgICAgICBvcHI6JydcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHNlbGYuZGVtbzEuZm9yRWFjaCgoaXRlbSk9PntcclxuICAgICAgICAgICAgbGV0IHVtdWJhbiA9IHtcclxuICAgICAgICAgICAgICB1c2VybmFtZTppdGVtLnVzZXJuYW1lLFxyXG4gICAgICAgICAgICAgIGVtYWlsOml0ZW0uZW1haWwsXHJcbiAgICAgICAgICAgICAgc2pDaGVjazpmYWxzZSxcclxuICAgICAgICAgICAgICBjY0NoZWNrOmZhbHNlLFxyXG4gICAgICAgICAgICAgIGJjY0NoZWNrOmZhbHNlLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wdGlvbi5wZW9wbGUucHVzaCh1bXViYW4pXHJcbiAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgIGxldCBvcHRpb25zID0gSlNPTi5zdHJpbmdpZnkob3B0aW9uKVxyXG4gICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygnb3B0aW9ucycsb3B0aW9ucylcclxuICAgICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcclxuICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL3dyaXRlJ1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblNob3coKSB7XHJcbiAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICB3ZXB5LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxyXG4gICAgICB9KVxyXG4gICAgICB3ZXB5LnJlbW92ZVN0b3JhZ2VTeW5jKCdvcHRpb25zJylcclxuICAgICAgc2VsZi5kZW1vMSA9IFtdO1xyXG4gICAgICBzZWxmLmFsbHNlbGVjdCA9IGZhbHNlXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICB1cmw6ICdodHRwczovL2R5d3N3ZWIuY29tL2dldHVzZXJsaXN0JyxcclxuICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgfSxcclxuICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xyXG4gICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICB2YXIgYXJyID0gW107XHJcbiAgICAgICAgICAgIHZhciBmYXJyID0gW10uY29uY2F0KHJlcy5kYXRhLnBlcnNvbnMuZmllbGRzKTtcclxuICAgICAgICAgICAgdmFyIGdhcnIgPSBbXS5jb25jYXQocmVzLmRhdGEuZ3JvdXBzKTtcclxuICAgICAgICAgICAgdmFyIHVuYXJyID0gW107XHJcbiAgICAgICAgICAgIHZhciB1bmdyb3VwID0gW107XHJcbiAgICAgICAgICAgIHZhciB1bmZhcnIgPSBbXS5jb25jYXQocmVzLmRhdGEucGVyc29ucy5maWVsZHMpO1xyXG4gICAgICAgICAgICB2YXIgdW5nYXJyID0gW10uY29uY2F0KHJlcy5kYXRhLmdyb3Vwcyk7XHJcbiAgICAgICAgICAgIGdhcnIuZm9yRWFjaCgoaXRlbSk9PntcclxuICAgICAgICAgICAgICB2YXIgZ211YmFuID0ge1xyXG4gICAgICAgICAgICAgICAgbmFtZTonJyxcclxuICAgICAgICAgICAgICAgIGNoZWNrOmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdXNlcjpbXVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBnbXViYW4ubmFtZSA9IGl0ZW0ubmFtZVxyXG4gICAgICAgICAgICAgIGZvcih2YXIgaT0wO2k8ZmFyci5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaj0wO2o8aXRlbS5tZW1iZXJzLmxlbmd0aDtqKyspe1xyXG4gICAgICAgICAgICAgICAgICBpZihmYXJyW2ldWzFdPT1pdGVtLm1lbWJlcnNbal0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1bXViYW4gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTpmYXJyW2ldWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZW1haWw6ZmFycltpXVsxXSxcclxuICAgICAgICAgICAgICAgICAgICAgIGNoZWNrOmZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGdtdWJhbi51c2VyLnB1c2godW11YmFuKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBhcnIucHVzaChnbXViYW4pO1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB1bmdhcnIuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcclxuICAgICAgICAgICAgICBmb3IodmFyIGk9MDtpPGl0ZW0ubWVtYmVycy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaj0wO2o8dW5mYXJyLmxlbmd0aDtqKyspe1xyXG4gICAgICAgICAgICAgICAgICBpZih1bmZhcnJbal1bMV09PWl0ZW0ubWVtYmVyc1tpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdW5mYXJyLnNwbGljZShqLDEpXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHZhciB1bmdkYXRhID17XHJcbiAgICAgICAgICAgICAgbmFtZTon5pyq5YiG57uE5oiQ5ZGYJyxcclxuICAgICAgICAgICAgICB1c2VyOltdLFxyXG4gICAgICAgICAgICAgIGNoZWNrOmZhbHNlLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHVuZmFyci5mb3JFYWNoKChpdGVtLGluZGV4KT0+e1xyXG4gICAgICAgICAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgdXNlcm5hbWU6aXRlbVswXSxcclxuICAgICAgICAgICAgICAgIGVtYWlsOml0ZW1bMV0sXHJcbiAgICAgICAgICAgICAgICBjaGVjazpmYWxzZVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB1bmdkYXRhLnVzZXIucHVzaChkYXRhKSAgICAgICAgIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgYXJyLnB1c2godW5nZGF0YSk7XHJcbiAgICAgICAgICAgIHZhciBhbGxtdWJhbj17XHJcbiAgICAgICAgICAgICAgbmFtZTon5omA5pyJ5oiQ5ZGYJyxcclxuICAgICAgICAgICAgICBjaGVjazp0cnVlLFxyXG4gICAgICAgICAgICAgIHVzZXI6W11cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmYXJyLmZvckVhY2goKGl0ZW0saW5kZXgpPT57XHJcbiAgICAgICAgICAgICAgdmFyIGFsbHVzZXJtdWJhbj17XHJcbiAgICAgICAgICAgICAgICB1c2VybmFtZTppdGVtWzBdLFxyXG4gICAgICAgICAgICAgICAgZW1haWw6aXRlbVsxXSxcclxuICAgICAgICAgICAgICAgIGNoZWNrOmZhbHNlXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGFsbG11YmFuLnVzZXIucHVzaChhbGx1c2VybXViYW4pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGFyci51bnNoaWZ0KGFsbG11YmFuKVxyXG4gICAgICAgICAgICBzZWxmLkdyb3VwbGlzdCA9IGFyclxyXG4gICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=