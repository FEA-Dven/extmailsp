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

var write = function (_wepy$page) {
  _inherits(write, _wepy$page);

  function write() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, write);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = write.__proto__ || Object.getPrototypeOf(write)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: 'ExtMail'
    }, _this.components = {}, _this.data = {
      UserList: '',
      sjUserInput: null,
      ccUserInput: null,
      bccUserInput: null,
      sjFocus: false,
      ccFocus: false,
      bccFocus: false,
      hasSjUsercheck: false,
      hasCcUsercheck: false,
      hasBccUsercheck: false,
      subject: '',
      textTheme: '',
      gettextTheme: '',
      sjArr: [],
      ccArr: [],
      bccArr: [],
      sjcuname: '',
      sjcuemail: '',
      cccuname: '',
      cccuemail: '',
      bcccuname: '',
      bcccuemail: '',
      composeId: ''
    }, _this.computed = {}, _this.methods = {
      oploadfile: function oploadfile() {
        wx.chooseImage({
          success: function success(res) {
            var tempFilePaths = res.tempFilePaths;
            _wepy2.default.uploadFile({
              url: 'https://dywsweb.com/upload',
              filePath: tempFilePaths[0],
              name: 'file',
              formData: {
                'user': 'test'
              },
              success: function success(res) {
                _wepy2.default.showToast({
                  title: '发送成功',
                  duration: 1000
                });
              }
            });
          }
        });
      },
      saveMail: function saveMail() {
        var self = this;
        var patt = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
        var format = true;
        if (self.sjUserInput !== '') {
          if (patt.test(self.sjUserInput)) {
            var existsjarr = false;
            var existuserlist = false;
            var canput = true;
            var userindex = void 0;
            var umuban = {
              username: '',
              email: '',
              sjCheck: false,
              ccCheck: false,
              bccCheck: false
            };
            self.UserList.user.forEach(function (item, index) {
              if (self.sjUserInput == item.email) {
                umuban.name = item.username;
                umuban.email = item.email;
                existuserlist = true;
                userindex = index;
                for (var i = 0; i < self.sjArr.length; i++) {
                  if (umuban.email == self.sjArr[i].email) {
                    _wepy2.default.showToast({
                      title: '已存在用户',
                      image: '../assets/w_cha.png',
                      duration: 1000
                    });
                    self.sjUserInput = '';
                    canput = false;
                    format = false;
                    existsjarr = true;
                  }
                }
              }
            });
            if (existuserlist == false) {
              var mymuban = {
                username: self.sjUserInput,
                email: self.sjUserInput,
                sjCheck: false,
                ccCheck: false,
                bccCheck: false
              };
              self.sjArr.forEach(function (item) {
                if (mymuban.email == item.email) {
                  canput = false;
                  format = false;
                  self.sjUserInput = '';
                  _wepy2.default.showToast({
                    title: '已存在用户',
                    image: '../assets/w_cha.png',
                    duration: 1000
                  });
                }
              });
              if (canput) {
                self.sjArr.push(mymuban);
                self.sjUserInput = '';
              }
            }
            if (existuserlist == true && existsjarr == false) {
              var usermuban = {
                username: self.UserList.user[userindex].username,
                email: self.UserList.user[userindex].email,
                sjCheck: false,
                ccCheck: false,
                bccCheck: false
              };
              self.sjArr.push(usermuban);
              self.sjUserInput = '';
            }
          } else {
            _wepy2.default.showToast({
              title: '收件人格式错误',
              image: '../assets/w_cha.png',
              duration: 1000
            });
            format = false;
          }
        }
        if (self.ccUserInput !== '') {
          if (patt.test(self.ccUserInput)) {
            var existccarr = false;
            var _existuserlist = false;
            var _canput = true;
            var _userindex = void 0;
            var _umuban = {
              username: '',
              email: '',
              sjCheck: false,
              ccCheck: false,
              bccCheck: false
            };
            self.UserList.user.forEach(function (item, index) {
              if (self.ccUserInput == item.email) {
                _umuban.name = item.username;
                _umuban.email = item.email;
                _existuserlist = true;
                _userindex = index;
                for (var i = 0; i < self.ccArr.length; i++) {
                  if (_umuban.email == self.ccArr[i].email) {
                    _wepy2.default.showToast({
                      title: '已存在用户',
                      image: '../assets/w_cha.png',
                      duration: 1000
                    });
                    self.ccUserInput = '';
                    _canput = false;
                    format = false;
                    existccarr = true;
                  }
                }
              }
            });
            if (_existuserlist == false) {
              var _mymuban = {
                username: self.ccUserInput,
                email: self.ccUserInput,
                sjCheck: false,
                ccCheck: false,
                bccCheck: false
              };
              self.ccArr.forEach(function (item) {
                if (_mymuban.email == item.email) {
                  _canput = false;
                  format = false;
                  self.ccUserInput = '';
                  _wepy2.default.showToast({
                    title: '已存在用户',
                    image: '../assets/w_cha.png',
                    duration: 1000
                  });
                }
              });
              if (_canput) {
                self.ccArr.push(_mymuban);
                self.ccUserInput = '';
              }
            }
            if (_existuserlist == true && existccarr == false) {
              var _usermuban = {
                username: self.UserList.user[_userindex].username,
                email: self.UserList.user[_userindex].email,
                sjCheck: false,
                ccCheck: false,
                bccCheck: false
              };
              self.ccArr.push(_usermuban);
              self.ccUserInput = '';
            }
          } else {
            _wepy2.default.showToast({
              title: '抄送格式错误',
              image: '../assets/w_cha.png',
              duration: 1000
            });
            format = false;
          }
        }
        if (self.bccUserInput !== '') {
          if (patt.test(self.bccUserInput)) {
            var existbccarr = false;
            var _existuserlist2 = false;
            var _canput2 = true;
            var _userindex2 = void 0;
            var _umuban2 = {
              username: '',
              email: '',
              sjCheck: false,
              ccCheck: false,
              bccCheck: false
            };
            self.UserList.user.forEach(function (item, index) {
              if (self.bccUserInput == item.email) {
                _umuban2.name = item.username;
                _umuban2.email = item.email;
                _existuserlist2 = true;
                _userindex2 = index;
                for (var i = 0; i < self.bccArr.length; i++) {
                  if (_umuban2.email == self.bccArr[i].email) {
                    _wepy2.default.showToast({
                      title: '已存在用户',
                      image: '../assets/w_cha.png',
                      duration: 1000
                    });
                    self.bccUserInput = '';
                    _canput2 = false;
                    format = false;
                    existbccarr = true;
                  }
                }
              }
            });
            if (_existuserlist2 == false) {
              var _mymuban2 = {
                username: self.bccUserInput,
                email: self.bccUserInput,
                sjCheck: false,
                ccCheck: false,
                bccCheck: false
              };
              self.bccArr.forEach(function (item) {
                if (_mymuban2.email == item.email) {
                  _canput2 = false;
                  format = false;
                  self.bccUserInput = '';
                  _wepy2.default.showToast({
                    title: '已存在用户',
                    image: '../assets/w_cha.png',
                    duration: 1000
                  });
                }
              });
              if (_canput2) {
                self.bccArr.push(_mymuban2);
                self.bccUserInput = '';
              }
            }
            if (_existuserlist2 == true && existbccarr == false) {
              var _usermuban2 = {
                username: self.UserList.user[_userindex2].username,
                email: self.UserList.user[_userindex2].email,
                sjCheck: false,
                ccCheck: false,
                bccCheck: false
              };
              self.bccArr.push(_usermuban2);
              self.bccUserInput = '';
            }
          } else {
            _wepy2.default.showToast({
              title: '密送格式错误',
              image: '../assets/w_cha.png',
              duration: 1000
            });
            format = false;
          }
        }
        if (format) {
          var savebcc = [];
          self.bccArr.forEach(function (item) {
            var savebccmb = {
              email: '',
              name: ''
            };
            savebccmb.email = item.email;
            savebccmb.name = item.username;
            savebcc.push(savebccmb);
          });

          var savecc = [];
          self.ccArr.forEach(function (item) {
            var saveccmb = {
              email: '',
              name: ''
            };
            saveccmb.email = item.email;
            saveccmb.name = item.username;
            savecc.push(saveccmb);
          });
          var savesj = [];
          self.sjArr.forEach(function (item) {
            var savesjmb = {
              email: '',
              name: ''
            };
            savesjmb.email = item.email;
            savesjmb.name = item.username;
            savesj.push(savesjmb);
          });
          var from = {
            email: _wepy2.default.getStorageSync('username'),
            name: _wepy2.default.getStorageSync('username')
          };
          var composeId = self.composeId;
          var mydata = {
            bcc: savebcc,
            body: self.textTheme,
            cc: savecc,
            compose_id: composeId,
            from: from,
            html: false,
            priority: 0,
            receipt: true,
            schedule: '10',
            subject: self.subject,
            to: savesj
            // console.log(mydata)
          };_wepy2.default.request({
            url: 'https://dywsweb.com/draft_save',
            data: mydata,
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function success(res) {
              _wepy2.default.showToast({
                title: '保存成功',
                duration: 1000
              });
              console.log(res);
            }
          });
        }
      },
      sendMail: function sendMail() {
        var self = this;
        var patt = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
        var format = true;
        if (self.sjUserInput !== '') {
          if (patt.test(self.sjUserInput)) {
            var existsjarr = false;
            var existuserlist = false;
            var canput = true;
            var userindex = void 0;
            var umuban = {
              username: '',
              email: '',
              sjCheck: false,
              ccCheck: false,
              bccCheck: false
            };
            self.UserList.user.forEach(function (item, index) {
              if (self.sjUserInput == item.email) {
                umuban.name = item.username;
                umuban.email = item.email;
                existuserlist = true;
                userindex = index;
                for (var i = 0; i < self.sjArr.length; i++) {
                  if (umuban.email == self.sjArr[i].email) {
                    _wepy2.default.showToast({
                      title: '已存在用户',
                      image: '../assets/w_cha.png',
                      duration: 1000
                    });
                    self.sjUserInput = '';
                    canput = false;
                    format = false;
                    existsjarr = true;
                  }
                }
              }
            });
            if (existuserlist == false) {
              var mymuban = {
                username: self.sjUserInput,
                email: self.sjUserInput,
                sjCheck: false,
                ccCheck: false,
                bccCheck: false
              };
              self.sjArr.forEach(function (item) {
                if (mymuban.email == item.email) {
                  canput = false;
                  format = false;
                  self.sjUserInput = '';
                  _wepy2.default.showToast({
                    title: '已存在用户',
                    image: '../assets/w_cha.png',
                    duration: 1000
                  });
                }
              });
              if (canput) {
                self.sjArr.push(mymuban);
                self.sjUserInput = '';
              }
            }
            if (existuserlist == true && existsjarr == false) {
              var usermuban = {
                username: self.UserList.user[userindex].username,
                email: self.UserList.user[userindex].email,
                sjCheck: false,
                ccCheck: false,
                bccCheck: false
              };
              self.sjArr.push(usermuban);
              self.sjUserInput = '';
            }
          } else {
            if (self.sjUserInput === null) {
              format = true;
            } else {
              _wepy2.default.showToast({
                title: '收件人格式错误',
                image: '../assets/w_cha.png',
                duration: 1000
              });
              format = false;
            }
          }
        }
        if (self.ccUserInput !== '') {
          if (patt.test(self.ccUserInput)) {
            var existccarr = false;
            var _existuserlist3 = false;
            var _canput3 = true;
            var _userindex3 = void 0;
            var _umuban3 = {
              username: '',
              email: '',
              sjCheck: false,
              ccCheck: false,
              bccCheck: false
            };
            self.UserList.user.forEach(function (item, index) {
              if (self.ccUserInput == item.email) {
                _umuban3.name = item.username;
                _umuban3.email = item.email;
                _existuserlist3 = true;
                _userindex3 = index;
                for (var i = 0; i < self.ccArr.length; i++) {
                  if (_umuban3.email == self.ccArr[i].email) {
                    _wepy2.default.showToast({
                      title: '已存在用户',
                      image: '../assets/w_cha.png',
                      duration: 1000
                    });
                    self.ccUserInput = '';
                    _canput3 = false;
                    format = false;
                    existccarr = true;
                  }
                }
              }
            });
            if (_existuserlist3 == false) {
              var _mymuban3 = {
                username: self.ccUserInput,
                email: self.ccUserInput,
                sjCheck: false,
                ccCheck: false,
                bccCheck: false
              };
              self.ccArr.forEach(function (item) {
                if (_mymuban3.email == item.email) {
                  _canput3 = false;
                  format = false;
                  self.ccUserInput = '';
                  _wepy2.default.showToast({
                    title: '已存在用户',
                    image: '../assets/w_cha.png',
                    duration: 1000
                  });
                }
              });
              if (_canput3) {
                self.ccArr.push(_mymuban3);
                self.ccUserInput = '';
              }
            }
            if (_existuserlist3 == true && existccarr == false) {
              var _usermuban3 = {
                username: self.UserList.user[_userindex3].username,
                email: self.UserList.user[_userindex3].email,
                sjCheck: false,
                ccCheck: false,
                bccCheck: false
              };
              self.ccArr.push(_usermuban3);
              self.ccUserInput = '';
            }
          } else {
            if (self.ccUserInput === null) {
              format = true;
            } else {
              _wepy2.default.showToast({
                title: '抄送用户格式错误',
                image: '../assets/w_cha.png',
                duration: 1000
              });
              format = false;
            }
          }
        }
        if (self.bccUserInput !== '') {
          if (patt.test(self.bccUserInput)) {
            var existbccarr = false;
            var _existuserlist4 = false;
            var _canput4 = true;
            var _userindex4 = void 0;
            var _umuban4 = {
              username: '',
              email: '',
              sjCheck: false,
              ccCheck: false,
              bccCheck: false
            };
            self.UserList.user.forEach(function (item, index) {
              if (self.bccUserInput == item.email) {
                _umuban4.name = item.username;
                _umuban4.email = item.email;
                _existuserlist4 = true;
                _userindex4 = index;
                for (var i = 0; i < self.bccArr.length; i++) {
                  if (_umuban4.email == self.bccArr[i].email) {
                    _wepy2.default.showToast({
                      title: '已存在用户',
                      image: '../assets/w_cha.png',
                      duration: 1000
                    });
                    self.bccUserInput = '';
                    _canput4 = false;
                    format = false;
                    existbccarr = true;
                  }
                }
              }
            });
            if (_existuserlist4 == false) {
              var _mymuban4 = {
                username: self.bccUserInput,
                email: self.bccUserInput,
                sjCheck: false,
                ccCheck: false,
                bccCheck: false
              };
              self.bccArr.forEach(function (item) {
                if (_mymuban4.email == item.email) {
                  _canput4 = false;
                  format = false;
                  self.bccUserInput = '';
                  _wepy2.default.showToast({
                    title: '已存在用户',
                    image: '../assets/w_cha.png',
                    duration: 1000
                  });
                }
              });
              if (_canput4) {
                self.bccArr.push(_mymuban4);
                self.bccUserInput = '';
              }
            }
            if (_existuserlist4 == true && existbccarr == false) {
              var _usermuban4 = {
                username: self.UserList.user[_userindex4].username,
                email: self.UserList.user[_userindex4].email,
                sjCheck: false,
                ccCheck: false,
                bccCheck: false
              };
              self.bccArr.push(_usermuban4);
              self.bccUserInput = '';
            }
          } else {
            if (self.bccUserInput === null) {
              format = true;
            } else {
              _wepy2.default.showToast({
                title: '密送用户格式错误',
                image: '../assets/w_cha.png',
                duration: 1000
              });
              format = false;
            }
          }
        }
        if (format) {
          var savebcc = [];
          self.bccArr.forEach(function (item) {
            var savebccmb = {
              email: '',
              name: ''
            };
            savebccmb.email = item.email;
            savebccmb.name = item.username;
            savebcc.push(savebccmb);
          });

          var savecc = [];
          self.ccArr.forEach(function (item) {
            var saveccmb = {
              email: '',
              name: ''
            };
            saveccmb.email = item.email;
            saveccmb.name = item.username;
            savecc.push(saveccmb);
          });
          var savesj = [];
          self.sjArr.forEach(function (item) {
            var savesjmb = {
              email: '',
              name: ''
            };
            savesjmb.email = item.email;
            savesjmb.name = item.username;
            savesj.push(savesjmb);
          });
          var from = {
            email: _wepy2.default.getStorageSync('username'),
            name: _wepy2.default.getStorageSync('username')
          };
          var composeId = self.composeId;
          var mydata = {
            bcc: savebcc,
            body: self.textTheme,
            cc: savecc,
            compose_id: composeId,
            from: from,
            html: false,
            priority: 0,
            receipt: true,
            schedule: '10',
            subject: self.subject,
            to: savesj
            // console.log(mydata)
          };_wepy2.default.request({
            url: 'https://dywsweb.com/msg_send',
            data: mydata,
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function success(res) {
              _wepy2.default.showToast({
                title: '发送成功',
                duration: 1000
              });
              console.log(res);
            }
          });
        }
      },
      lostsjfocus: function lostsjfocus() {
        this.sjFocus = false;
      },
      lostccfocus: function lostccfocus() {
        this.ccFocus = false;
      },
      lostbccfocus: function lostbccfocus() {
        this.bccFocus = false;
      },
      changeSjFocus: function changeSjFocus() {
        this.sjFocus = true;
      },
      changeCcFocus: function changeCcFocus() {
        this.ccFocus = true;
      },
      changeBccFocus: function changeBccFocus() {
        this.bccFocus = true;
      },
      userMethods: function userMethods(email, key) {
        var self = this;
        var username;
        self.UserList.user.forEach(function (item) {
          if (email == item.email) {
            username = item.username;
          }
        });
        if (key == 'sj') {
          self.hasSjUsercheck = true;
          self.sjArr.forEach(function (item) {
            if (email == item.email) {
              item.sjCheck = true;
              self.sjcuname = item.username;
              self.sjcuemail = item.email;
            } else {
              item.sjCheck = false;
            }
          });
        } else if (key == 'cc') {
          self.hasCcUsercheck = true;
          self.ccArr.forEach(function (item) {
            if (email == item.email) {
              item.ccCheck = true;
              self.cccuname = item.username;
              self.cccuemail = item.email;
            } else {
              item.ccCheck = false;
            }
          });
        } else if (key == 'bcc') {
          self.hasBccUsercheck = true;
          self.bccArr.forEach(function (item) {
            if (email == item.email) {
              item.bccCheck = true;
              self.bcccuname = item.username;
              self.bcccuemail = item.email;
            } else {
              item.bccCheck = false;
            }
          });
        }
      },
      pickArr: function pickArr(e) {
        var self = this;
        var sy = e.detail.value;
        var username = self.UserList.user[sy].username;
        var keyword = e.currentTarget.dataset.keyword;
        var haspeople = false;
        if (sy > 0) {
          if (keyword == 'sj') {
            var putemail = self.UserList.user[sy].email;
            if (self.sjArr.length > 0) {
              self.sjArr.forEach(function (item) {
                if (item.email == putemail) {
                  haspeople = true;
                  _wepy2.default.showToast({
                    title: '已存在用户',
                    image: '../assets/w_cha.png',
                    duration: 1000
                  });
                }
              });
              if (haspeople) {} else {
                self.sjArr.push(self.UserList.user[sy]);
              }
            } else {
              self.sjArr.push(self.UserList.user[sy]);
            }
          } else if (keyword == 'cc') {
            var _putemail = self.UserList.user[sy].email;
            if (self.ccArr.length > 0) {
              self.ccArr.forEach(function (item) {
                if (item.email == _putemail) {
                  haspeople = true;
                  _wepy2.default.showToast({
                    title: '已存在用户',
                    image: '../assets/w_cha.png',
                    duration: 1000
                  });
                }
              });
              if (haspeople) {} else {
                self.ccArr.push(self.UserList.user[sy]);
              }
            } else {
              self.ccArr.push(self.UserList.user[sy]);
            }
          } else if (keyword == 'bcc') {
            var _putemail2 = self.UserList.user[sy].email;
            if (self.bccArr.length > 0) {
              self.bccArr.forEach(function (item) {
                if (item.email == _putemail2) {
                  haspeople = true;
                  _wepy2.default.showToast({
                    title: '已存在用户',
                    image: '../assets/w_cha.png',
                    duration: 1000
                  });
                }
              });
              if (haspeople) {} else {
                self.bccArr.push(self.UserList.user[sy]);
              }
            } else {
              self.bccArr.push(self.UserList.user[sy]);
            }
          }
        } else {
          _wepy2.default.showToast({
            title: '请选择用户',
            image: '../assets/w_cha.png',
            duration: 1000
          });
        }
      },
      putinArr: function putinArr(e) {
        var self = this;
        var inputvalue = e.detail.value;
        var putemail = void 0;
        var key = e.currentTarget.dataset.keyword;
        var patt = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
        if (key == 'sj') {
          self.sjUserInput = e.detail.value;
        } else if (key == 'cc') {
          self.ccUserInput = e.detail.value;
        } else {
          self.bccUserInput = e.detail.value;
        }
        if (inputvalue.indexOf(';') > 0) {
          if (patt.test(inputvalue.substr(0, inputvalue.length - 1))) {
            var checkemail = inputvalue.substr(0, inputvalue.length - 1);
            var hasemail = false;
            var arrhasemail = false;
            var newemail = {
              username: '',
              email: '',
              sjCheck: false,
              ccCheck: false,
              bccCheck: false
            };
            self.UserList.user.forEach(function (item) {
              if (checkemail == item.email) {
                newemail.username = item.username;
                newemail.email = item.email;
                hasemail = true;
              }
            });
            if (key == 'sj') {
              if (hasemail) {
                var _arrhasemail = false;
                self.sjArr.forEach(function (item) {
                  if (newemail.email == item.email) {
                    _arrhasemail = true;
                  }
                });
                if (_arrhasemail) {
                  _wepy2.default.showToast({
                    title: '已经存在用户',
                    image: '../assets/w_cha.png',
                    duration: 1000
                  });
                  self.sjUserInput = null;
                } else {
                  self.sjArr.push(newemail);
                  self.sjUserInput = null;
                }
              } else {
                var hasarremail = false;
                var umuban = {
                  username: inputvalue.substr(0, inputvalue.length - 1),
                  email: inputvalue.substr(0, inputvalue.length - 1),
                  sjCheck: false,
                  ccCheck: false,
                  bccCheck: false
                };
                self.sjArr.forEach(function (item) {
                  if (umuban.email == item.email) {
                    hasarremail = true;
                  }
                });
                if (hasarremail) {
                  _wepy2.default.showToast({
                    title: '已经存在用户',
                    image: '../assets/w_cha.png',
                    duration: 1000
                  });
                  self.sjUserInput = null;
                } else {
                  self.sjArr.push(umuban);
                  self.sjUserInput = null;
                }
              }
            } else if (key == 'cc') {
              if (hasemail) {
                var _arrhasemail2 = false;
                self.ccArr.forEach(function (item) {
                  if (newemail.email == item.email) {
                    _arrhasemail2 = true;
                  }
                });
                if (_arrhasemail2) {
                  _wepy2.default.showToast({
                    title: '已经存在用户',
                    image: '../assets/w_cha.png',
                    duration: 1000
                  });
                  self.ccUserInput = null;
                } else {
                  self.ccArr.push(newemail);
                }
              } else {
                var _umuban5 = {
                  username: inputvalue.substr(0, inputvalue.length - 1),
                  email: inputvalue.substr(0, inputvalue.length - 1),
                  sjCheck: false,
                  ccCheck: false,
                  bccCheck: false
                };
                var _hasarremail = false;
                self.ccArr.forEach(function (item) {
                  if (_umuban5.email == item.email) {
                    _hasarremail = true;
                  }
                });
                if (_hasarremail) {
                  _wepy2.default.showToast({
                    title: '已经存在用户',
                    image: '../assets/w_cha.png',
                    duration: 1000
                  });
                  self.ccUserInput = null;
                } else {
                  self.ccArr.push(_umuban5);
                  self.ccUserInput = null;
                }
              }
            } else {
              if (hasemail) {
                var _arrhasemail3 = false;
                self.bccArr.forEach(function (item) {
                  if (newemail.email == item.email) {
                    _arrhasemail3 = true;
                  }
                });
                if (_arrhasemail3) {
                  _wepy2.default.showToast({
                    title: '已经存在用户',
                    image: '../assets/w_cha.png',
                    duration: 1000
                  });
                  self.bccUserInput = null;
                } else {
                  self.bccArr.push(newemail);
                }
              } else {
                var _umuban6 = {
                  username: inputvalue.substr(0, inputvalue.length - 1),
                  email: inputvalue.substr(0, inputvalue.length - 1),
                  sjCheck: false,
                  ccCheck: false,
                  bccCheck: false
                };
                var _hasarremail2 = false;
                self.bccArr.forEach(function (item) {
                  if (_umuban6.email == item.email) {
                    _hasarremail2 = true;
                  }
                });
                if (_hasarremail2) {
                  _wepy2.default.showToast({
                    title: '已经存在用户',
                    image: '../assets/w_cha.png',
                    duration: 1000
                  });
                  self.bccUserInput = null;
                } else {
                  self.bccArr.push(_umuban6);
                  self.bccUserInput = null;
                }
              }
            }
          } else {
            putemail = inputvalue.substr(0, inputvalue.length - 1);
            _wepy2.default.showToast({
              title: '请输入正确邮箱地址',
              image: '../assets/w_cha.png',
              duration: 1000
            });
            if (key == 'sj') {
              self.sjUserInput = putemail;
            } else if (key == 'cc') {
              self.ccUserInput = putemail;
            } else if (key == 'bcc') {
              self.bccUserInput = putemail;
            }
          }
        }
      },
      cancelCheck: function cancelCheck(key) {
        var self = this;
        if (key == 'sj') {
          self.hasSjUsercheck = false;
          self.sjArr.forEach(function (item) {
            item.sjCheck = false;
          });
        } else if (key == 'cc') {
          self.hasCcUsercheck = false;
          self.ccArr.forEach(function (item) {
            item.ccCheck = false;
          });
        } else if (key == 'bcc') {
          self.hasBccUsercheck = false;
          self.bccArr.forEach(function (item) {
            item.bccCheck = false;
          });
        }
      },
      delcu: function delcu(email, key) {
        var self = this;
        if (key == 'sj') {
          self.sjArr.forEach(function (item, index) {
            if (email == item.email) {
              item.sjCheck = false;
              self.sjArr.splice(index, 1);
            }
          });
          self.hasSjUsercheck = false;
        } else if (key == 'cc') {
          self.ccArr.forEach(function (item, index) {
            if (email == item.email) {
              item.ccCheck = false;
              self.ccArr.splice(index, 1);
            }
          });
          self.hasCcUsercheck = false;
        } else if (key == 'bcc') {
          self.bccArr.forEach(function (item, index) {
            if (email == item.email) {
              item.bccCheck = false;
              self.bccArr.splice(index, 1);
            }
          });
          self.hasBccUsercheck = false;
        }
      },
      changeSubject: function changeSubject(e) {
        var self = this;
        self.subject = e.detail.value;
      },
      changeTextarea: function changeTextarea(e) {
        var self = this;
        self.textTheme = e.detail.value;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(write, [{
    key: 'onShow',
    value: function onShow() {
      var self = this;
      self.sjArr = [];
      self.textTheme = '';
      self.gettextTheme = '';
      self.subject = '';
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
          var allmuban = {
            name: '所有成员',
            check: true,
            user: []
          };
          farr.forEach(function (item, index) {
            var allusermuban = {
              username: item[0],
              email: item[1],
              sjCheck: false,
              ccCheck: false,
              bccCheck: false
            };

            allmuban.user.push(allusermuban);
          });
          var alls = {
            username: '请选择',
            email: '请选择',
            sjCheck: false,
            ccCheck: false,
            bccCheck: false
          };
          allmuban.user.unshift(alls);
          self.UserList = allmuban;
          self.$apply();
        }
      });
      var options = _wepy2.default.getStorageSync('options');
      if (options !== '') {
        options = JSON.parse(_wepy2.default.getStorageSync('options'));
        if (options.opr == '') {
          self.sjArr = options.people;
        } else {
          self.sjArr = options.people;
          _wepy2.default.showLoading({
            title: '加载中'
          });
          if (options.opr == "reply_all") {
            var mydata = {
              folder_id: options.folder_id,
              msg_id: options.msg_id,
              opr: options.opr
            };
            _wepy2.default.request({
              url: 'https://dywsweb.com/initmail',
              data: mydata,
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'POST',
              success: function success(res) {
                self.subject = "回复:" + res.data.subject;
                var infohead = "---原始邮件--- \n";
                var sendtor = "发件人:" + "\"" + res.data.from + "\"" + "<" + res.data.from + ">\n";
                var stime = res.data.schedule;
                var sendtime = "发送时间:" + stime + '\n';
                var recipients = "收件人:";
                res.data.to.forEach(function (item) {
                  recipients += "\"" + item.name + "\"" + "<" + item.email + ">" + ";";
                });
                recipients += '\n';
                var subject = "主题:" + res.data.subject + '\n' + '\n';
                var text = res.data.text.body;
                var str = '\n \n \n \n \n' + infohead + sendtor + sendtime + recipients + subject + text;
                self.gettextTheme = str;
                self.composeId = res.data.compose_id;
                self.$apply();
                _wepy2.default.hideLoading();
              }
            });
          } else {
            _wepy2.default.showLoading({
              title: '加载中'
            });
            var _mydata = {
              folder_id: options.folder_id,
              msg_id: options.msg_id,
              opr: options.opr
            };
            _wepy2.default.request({
              url: 'https://dywsweb.com/initmail',
              data: _mydata,
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'POST',
              success: function success(res) {
                self.subject = "转发:" + res.data.subject;
                var infohead = "---原始邮件--- \n";
                var sendtor = "发件人:" + "\"" + res.data.from + "\"" + "<" + res.data.from + ">\n";
                var stime = res.data.schedule;
                var sendtime = "发送时间:" + stime + '\n';
                var recipients = "收件人:";
                res.data.to.forEach(function (item) {
                  recipients += "\"" + item.name + "\"" + "<" + item.email + ">" + ";";
                });
                recipients += '\n';
                var subject = "主题:" + res.data.subject + '\n' + '\n';
                var text = res.data.text.body;
                var str = '\n \n \n \n \n' + infohead + sendtor + sendtime + recipients + subject + text;
                self.gettextTheme = str;
                self.composeId = res.data.compose_id;
                self.$apply();
                _wepy2.default.hideLoading();
              }
            });
          }
        }
      } else {
        options = {
          folder_id: '',
          msg_id: '',
          opr: ''
        };
        var _mydata2 = {
          folder_id: options.folder_id,
          msg_id: options.msg_id,
          opr: options.opr
        };
        _wepy2.default.request({
          url: 'https://dywsweb.com/initmail',
          data: _mydata2,
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          success: function success(res) {
            self.composeId = res.data.compose_id;
          }
        });
      }
    }
  }]);

  return write;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(write , 'pages/write'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndyaXRlLmpzIl0sIm5hbWVzIjpbIndyaXRlIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJkYXRhIiwiVXNlckxpc3QiLCJzalVzZXJJbnB1dCIsImNjVXNlcklucHV0IiwiYmNjVXNlcklucHV0Iiwic2pGb2N1cyIsImNjRm9jdXMiLCJiY2NGb2N1cyIsImhhc1NqVXNlcmNoZWNrIiwiaGFzQ2NVc2VyY2hlY2siLCJoYXNCY2NVc2VyY2hlY2siLCJzdWJqZWN0IiwidGV4dFRoZW1lIiwiZ2V0dGV4dFRoZW1lIiwic2pBcnIiLCJjY0FyciIsImJjY0FyciIsInNqY3VuYW1lIiwic2pjdWVtYWlsIiwiY2NjdW5hbWUiLCJjY2N1ZW1haWwiLCJiY2NjdW5hbWUiLCJiY2NjdWVtYWlsIiwiY29tcG9zZUlkIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwib3Bsb2FkZmlsZSIsInd4IiwiY2hvb3NlSW1hZ2UiLCJzdWNjZXNzIiwicmVzIiwidGVtcEZpbGVQYXRocyIsInVwbG9hZEZpbGUiLCJ1cmwiLCJmaWxlUGF0aCIsIm5hbWUiLCJmb3JtRGF0YSIsInNob3dUb2FzdCIsInRpdGxlIiwiZHVyYXRpb24iLCJzYXZlTWFpbCIsInNlbGYiLCJwYXR0IiwiZm9ybWF0IiwidGVzdCIsImV4aXN0c2phcnIiLCJleGlzdHVzZXJsaXN0IiwiY2FucHV0IiwidXNlcmluZGV4IiwidW11YmFuIiwidXNlcm5hbWUiLCJlbWFpbCIsInNqQ2hlY2siLCJjY0NoZWNrIiwiYmNjQ2hlY2siLCJ1c2VyIiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsImkiLCJsZW5ndGgiLCJpbWFnZSIsIm15bXViYW4iLCJwdXNoIiwidXNlcm11YmFuIiwiZXhpc3RjY2FyciIsImV4aXN0YmNjYXJyIiwic2F2ZWJjYyIsInNhdmViY2NtYiIsInNhdmVjYyIsInNhdmVjY21iIiwic2F2ZXNqIiwic2F2ZXNqbWIiLCJmcm9tIiwiZ2V0U3RvcmFnZVN5bmMiLCJteWRhdGEiLCJiY2MiLCJib2R5IiwiY2MiLCJjb21wb3NlX2lkIiwiaHRtbCIsInByaW9yaXR5IiwicmVjZWlwdCIsInNjaGVkdWxlIiwidG8iLCJyZXF1ZXN0IiwiaGVhZGVyIiwibWV0aG9kIiwiY29uc29sZSIsImxvZyIsInNlbmRNYWlsIiwibG9zdHNqZm9jdXMiLCJsb3N0Y2Nmb2N1cyIsImxvc3RiY2Nmb2N1cyIsImNoYW5nZVNqRm9jdXMiLCJjaGFuZ2VDY0ZvY3VzIiwiY2hhbmdlQmNjRm9jdXMiLCJ1c2VyTWV0aG9kcyIsImtleSIsInBpY2tBcnIiLCJlIiwic3kiLCJkZXRhaWwiLCJ2YWx1ZSIsImtleXdvcmQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImhhc3Blb3BsZSIsInB1dGVtYWlsIiwicHV0aW5BcnIiLCJpbnB1dHZhbHVlIiwiaW5kZXhPZiIsInN1YnN0ciIsImNoZWNrZW1haWwiLCJoYXNlbWFpbCIsImFycmhhc2VtYWlsIiwibmV3ZW1haWwiLCJoYXNhcnJlbWFpbCIsImNhbmNlbENoZWNrIiwiZGVsY3UiLCJzcGxpY2UiLCJjaGFuZ2VTdWJqZWN0IiwiY2hhbmdlVGV4dGFyZWEiLCJhcnIiLCJmYXJyIiwiY29uY2F0IiwicGVyc29ucyIsImZpZWxkcyIsImFsbG11YmFuIiwiY2hlY2siLCJhbGx1c2VybXViYW4iLCJhbGxzIiwidW5zaGlmdCIsIiRhcHBseSIsIm9wdGlvbnMiLCJKU09OIiwicGFyc2UiLCJvcHIiLCJwZW9wbGUiLCJzaG93TG9hZGluZyIsImZvbGRlcl9pZCIsIm1zZ19pZCIsImluZm9oZWFkIiwic2VuZHRvciIsInN0aW1lIiwic2VuZHRpbWUiLCJyZWNpcGllbnRzIiwidGV4dCIsInN0ciIsImhpZGVMb2FkaW5nIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhLEUsUUFJYkMsSSxHQUFP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QUEwQkMsT0FBMUIsR0FBa0NFLFFBQWxDLEdBQTJDQyxVQUEzQyxHQUFzRHZJLE9BQXRELEdBQThEd0ksSUFBeEU7QUFDQTFHLHFCQUFLNUIsWUFBTCxHQUFvQnVJLEdBQXBCO0FBQ0EzRyxxQkFBS2xCLFNBQUwsR0FBaUJPLElBQUk5QixJQUFKLENBQVMrRSxVQUExQjtBQUNBdEMscUJBQUs0RixNQUFMO0FBQ0EsK0JBQUtnQixXQUFMO0FBQ0Q7QUF6QlUsYUFBYjtBQTJCRDtBQUNGO0FBQ0QsT0FoRkQsTUFnRks7QUFDSmYsa0JBQVU7QUFDUk0scUJBQVUsRUFERjtBQUVSQyxrQkFBTyxFQUZDO0FBR1JKLGVBQUk7QUFISSxTQUFWO0FBS0EsWUFBSTlELFdBQVM7QUFDWGlFLHFCQUFVTixRQUFRTSxTQURQO0FBRVhDLGtCQUFPUCxRQUFRTyxNQUZKO0FBR1hKLGVBQUlILFFBQVFHO0FBSEQsU0FBYjtBQUtBLHVCQUFLcEQsT0FBTCxDQUFhO0FBQ1BwRCxlQUFLLDhCQURFO0FBRVBqQyxnQkFBTTJFLFFBRkM7QUFHUFcsa0JBQVE7QUFDTiw0QkFBZ0I7QUFEVixXQUhEO0FBTVBDLGtCQUFRLE1BTkQ7QUFPUDFELG1CQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDdEJXLGlCQUFLbEIsU0FBTCxHQUFpQk8sSUFBSTlCLElBQUosQ0FBUytFLFVBQTFCO0FBQ0Q7QUFUTSxTQUFiO0FBV0E7QUFFRDs7OztFQXRzQ2dDLGVBQUt1RSxJOztrQkFBbkIxSixLIiwiZmlsZSI6IndyaXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3Mgd3JpdGUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnRXh0TWFpbCdcclxuICAgIH1cclxuICAgIGNvbXBvbmVudHMgPSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgVXNlckxpc3Q6JycsXHJcbiAgICAgc2pVc2VySW5wdXQ6bnVsbCxcclxuICAgICBjY1VzZXJJbnB1dDpudWxsLFxyXG4gICAgIGJjY1VzZXJJbnB1dDpudWxsLFxyXG4gICAgIHNqRm9jdXM6ZmFsc2UsXHJcbiAgICAgY2NGb2N1czpmYWxzZSxcclxuICAgICBiY2NGb2N1czpmYWxzZSxcclxuICAgICBoYXNTalVzZXJjaGVjazpmYWxzZSxcclxuICAgICBoYXNDY1VzZXJjaGVjazpmYWxzZSxcclxuICAgICBoYXNCY2NVc2VyY2hlY2s6ZmFsc2UsXHJcbiAgICAgc3ViamVjdDonJyxcclxuICAgICB0ZXh0VGhlbWU6JycsXHJcbiAgICAgZ2V0dGV4dFRoZW1lOicnLFxyXG4gICAgIHNqQXJyOltdLFxyXG4gICAgIGNjQXJyOltdLFxyXG4gICAgIGJjY0FycjpbXSxcclxuICAgICBzamN1bmFtZTonJyxcclxuICAgICBzamN1ZW1haWw6JycsXHJcbiAgICAgY2NjdW5hbWU6JycsXHJcbiAgICAgY2NjdWVtYWlsOicnLFxyXG4gICAgIGJjY2N1bmFtZTonJyxcclxuICAgICBiY2NjdWVtYWlsOicnLFxyXG4gICAgIGNvbXBvc2VJZDonJyxcclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgb3Bsb2FkZmlsZSgpe1xyXG4gICAgICAgIHd4LmNob29zZUltYWdlKHtcclxuICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgdmFyIHRlbXBGaWxlUGF0aHMgPSByZXMudGVtcEZpbGVQYXRoc1xyXG4gICAgICAgICAgICB3ZXB5LnVwbG9hZEZpbGUoe1xyXG4gICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZHl3c3dlYi5jb20vdXBsb2FkJyxcclxuICAgICAgICAgICAgICBmaWxlUGF0aDogdGVtcEZpbGVQYXRoc1swXSxcclxuICAgICAgICAgICAgICBuYW1lOiAnZmlsZScsXHJcbiAgICAgICAgICAgICAgZm9ybURhdGE6e1xyXG4gICAgICAgICAgICAgICAgJ3VzZXInOiAndGVzdCdcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5Y+R6YCB5oiQ5YqfJyxcclxuICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG4gICAgICBzYXZlTWFpbCgpe1xyXG4gICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgbGV0IHBhdHQgPSAvXihcXHcpKyhcXC5cXHcrKSpAKFxcdykrKChcXC5cXHd7MiwzfSl7MSwzfSkkLztcclxuICAgICAgbGV0IGZvcm1hdCA9IHRydWVcclxuICAgICAgaWYoc2VsZi5zalVzZXJJbnB1dCE9PScnKXtcclxuICAgICAgICBpZihwYXR0LnRlc3Qoc2VsZi5zalVzZXJJbnB1dCkpe1xyXG4gICAgICAgICAgbGV0IGV4aXN0c2phcnIgPSBmYWxzZVxyXG4gICAgICAgICAgbGV0IGV4aXN0dXNlcmxpc3QgPSBmYWxzZVxyXG4gICAgICAgICAgbGV0IGNhbnB1dCA9IHRydWVcclxuICAgICAgICAgIGxldCB1c2VyaW5kZXg7XHJcbiAgICAgICAgICBsZXQgdW11YmFuID0ge1xyXG4gICAgICAgICAgICB1c2VybmFtZTonJyxcclxuICAgICAgICAgICAgZW1haWw6JycsXHJcbiAgICAgICAgICAgIHNqQ2hlY2s6ZmFsc2UsXHJcbiAgICAgICAgICAgIGNjQ2hlY2s6ZmFsc2UsXHJcbiAgICAgICAgICAgIGJjY0NoZWNrOmZhbHNlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBzZWxmLlVzZXJMaXN0LnVzZXIuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcclxuICAgICAgICAgICAgaWYoc2VsZi5zalVzZXJJbnB1dD09aXRlbS5lbWFpbCl7XHJcbiAgICAgICAgICAgICAgdW11YmFuLm5hbWUgPSBpdGVtLnVzZXJuYW1lXHJcbiAgICAgICAgICAgICAgdW11YmFuLmVtYWlsID0gaXRlbS5lbWFpbFxyXG4gICAgICAgICAgICAgIGV4aXN0dXNlcmxpc3QgPSB0cnVlXHJcbiAgICAgICAgICAgICAgdXNlcmluZGV4ID0gaW5kZXhcclxuICAgICAgICAgICAgICBmb3IodmFyIGk9MDtpPHNlbGYuc2pBcnIubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICBpZih1bXViYW4uZW1haWw9PXNlbGYuc2pBcnJbaV0uZW1haWwpe1xyXG4gICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6J+W3suWtmOWcqOeUqOaItycsXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6Jy4uL2Fzc2V0cy93X2NoYS5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOjEwMDBcclxuICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgc2VsZi5zalVzZXJJbnB1dCA9ICcnXHJcbiAgICAgICAgICAgICAgICAgIGNhbnB1dCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgIGZvcm1hdCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgIGV4aXN0c2phcnIgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgaWYoZXhpc3R1c2VybGlzdD09ZmFsc2Upe1xyXG4gICAgICAgICAgICBsZXQgbXltdWJhbiA9IHtcclxuICAgICAgICAgICAgICB1c2VybmFtZTpzZWxmLnNqVXNlcklucHV0LFxyXG4gICAgICAgICAgICAgIGVtYWlsOnNlbGYuc2pVc2VySW5wdXQsXHJcbiAgICAgICAgICAgICAgc2pDaGVjazpmYWxzZSxcclxuICAgICAgICAgICAgICBjY0NoZWNrOmZhbHNlLFxyXG4gICAgICAgICAgICAgIGJjY0NoZWNrOmZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5zakFyci5mb3JFYWNoKChpdGVtKT0+e1xyXG4gICAgICAgICAgICAgIGlmKG15bXViYW4uZW1haWw9PWl0ZW0uZW1haWwpe1xyXG4gICAgICAgICAgICAgICAgY2FucHV0ID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIGZvcm1hdCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBzZWxmLnNqVXNlcklucHV0ID0gJydcclxuICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6J+W3suWtmOWcqOeUqOaItycsXHJcbiAgICAgICAgICAgICAgICAgIGltYWdlOicuLi9hc3NldHMvd19jaGEucG5nJyxcclxuICAgICAgICAgICAgICAgICAgZHVyYXRpb246MTAwMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pICAgXHJcbiAgICAgICAgICAgIGlmKGNhbnB1dCl7XHJcbiAgICAgICAgICAgICBzZWxmLnNqQXJyLnB1c2gobXltdWJhbilcclxuICAgICAgICAgICAgIHNlbGYuc2pVc2VySW5wdXQgPSAnJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZihleGlzdHVzZXJsaXN0PT10cnVlJiZleGlzdHNqYXJyPT1mYWxzZSl7XHJcbiAgICAgICAgICAgIGxldCB1c2VybXViYW4gPSB7XHJcbiAgICAgICAgICAgICAgdXNlcm5hbWU6c2VsZi5Vc2VyTGlzdC51c2VyW3VzZXJpbmRleF0udXNlcm5hbWUsXHJcbiAgICAgICAgICAgICAgZW1haWw6c2VsZi5Vc2VyTGlzdC51c2VyW3VzZXJpbmRleF0uZW1haWwsXHJcbiAgICAgICAgICAgICAgc2pDaGVjazpmYWxzZSxcclxuICAgICAgICAgICAgICBjY0NoZWNrOmZhbHNlLFxyXG4gICAgICAgICAgICAgIGJjY0NoZWNrOmZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5zakFyci5wdXNoKHVzZXJtdWJhbilcclxuICAgICAgICAgICAgc2VsZi5zalVzZXJJbnB1dCA9ICcnXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOifmlLbku7bkurrmoLzlvI/plJnor68nLFxyXG4gICAgICAgICAgICBpbWFnZTonLi4vYXNzZXRzL3dfY2hhLnBuZycsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOjEwMDBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICBmb3JtYXQgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZihzZWxmLmNjVXNlcklucHV0IT09Jycpe1xyXG4gICAgICAgIGlmKHBhdHQudGVzdChzZWxmLmNjVXNlcklucHV0KSl7XHJcbiAgICAgICAgICBsZXQgZXhpc3RjY2FyciA9IGZhbHNlXHJcbiAgICAgICAgICBsZXQgZXhpc3R1c2VybGlzdCA9IGZhbHNlXHJcbiAgICAgICAgICBsZXQgY2FucHV0ID0gdHJ1ZVxyXG4gICAgICAgICAgbGV0IHVzZXJpbmRleDtcclxuICAgICAgICAgIGxldCB1bXViYW4gPSB7XHJcbiAgICAgICAgICAgIHVzZXJuYW1lOicnLFxyXG4gICAgICAgICAgICBlbWFpbDonJyxcclxuICAgICAgICAgICAgc2pDaGVjazpmYWxzZSxcclxuICAgICAgICAgICAgY2NDaGVjazpmYWxzZSxcclxuICAgICAgICAgICAgYmNjQ2hlY2s6ZmFsc2VcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHNlbGYuVXNlckxpc3QudXNlci5mb3JFYWNoKChpdGVtLGluZGV4KT0+e1xyXG4gICAgICAgICAgICBpZihzZWxmLmNjVXNlcklucHV0PT1pdGVtLmVtYWlsKXtcclxuICAgICAgICAgICAgICB1bXViYW4ubmFtZSA9IGl0ZW0udXNlcm5hbWVcclxuICAgICAgICAgICAgICB1bXViYW4uZW1haWwgPSBpdGVtLmVtYWlsXHJcbiAgICAgICAgICAgICAgZXhpc3R1c2VybGlzdCA9IHRydWVcclxuICAgICAgICAgICAgICB1c2VyaW5kZXggPSBpbmRleFxyXG4gICAgICAgICAgICAgIGZvcih2YXIgaT0wO2k8c2VsZi5jY0Fyci5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKHVtdWJhbi5lbWFpbD09c2VsZi5jY0FycltpXS5lbWFpbCl7XHJcbiAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTon5bey5a2Y5Zyo55So5oi3JyxcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZTonLi4vYXNzZXRzL3dfY2hhLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246MTAwMFxyXG4gICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICBzZWxmLmNjVXNlcklucHV0ID0gJydcclxuICAgICAgICAgICAgICAgICAgY2FucHV0ID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgZm9ybWF0ID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgZXhpc3RjY2FyciA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICBpZihleGlzdHVzZXJsaXN0PT1mYWxzZSl7XHJcbiAgICAgICAgICAgIGxldCBteW11YmFuID0ge1xyXG4gICAgICAgICAgICAgIHVzZXJuYW1lOnNlbGYuY2NVc2VySW5wdXQsXHJcbiAgICAgICAgICAgICAgZW1haWw6c2VsZi5jY1VzZXJJbnB1dCxcclxuICAgICAgICAgICAgICBzakNoZWNrOmZhbHNlLFxyXG4gICAgICAgICAgICAgIGNjQ2hlY2s6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgYmNjQ2hlY2s6ZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLmNjQXJyLmZvckVhY2goKGl0ZW0pPT57XHJcbiAgICAgICAgICAgICAgaWYobXltdWJhbi5lbWFpbD09aXRlbS5lbWFpbCl7XHJcbiAgICAgICAgICAgICAgICBjYW5wdXQgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHNlbGYuY2NVc2VySW5wdXQgPSAnJ1xyXG4gICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTon5bey5a2Y5Zyo55So5oi3JyxcclxuICAgICAgICAgICAgICAgICAgaW1hZ2U6Jy4uL2Fzc2V0cy93X2NoYS5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICBkdXJhdGlvbjoxMDAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkgICBcclxuICAgICAgICAgICAgaWYoY2FucHV0KXtcclxuICAgICAgICAgICAgIHNlbGYuY2NBcnIucHVzaChteW11YmFuKVxyXG4gICAgICAgICAgICAgc2VsZi5jY1VzZXJJbnB1dCA9ICcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKGV4aXN0dXNlcmxpc3Q9PXRydWUmJmV4aXN0Y2NhcnI9PWZhbHNlKXtcclxuICAgICAgICAgICAgbGV0IHVzZXJtdWJhbiA9IHtcclxuICAgICAgICAgICAgICB1c2VybmFtZTpzZWxmLlVzZXJMaXN0LnVzZXJbdXNlcmluZGV4XS51c2VybmFtZSxcclxuICAgICAgICAgICAgICBlbWFpbDpzZWxmLlVzZXJMaXN0LnVzZXJbdXNlcmluZGV4XS5lbWFpbCxcclxuICAgICAgICAgICAgICBzakNoZWNrOmZhbHNlLFxyXG4gICAgICAgICAgICAgIGNjQ2hlY2s6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgYmNjQ2hlY2s6ZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLmNjQXJyLnB1c2godXNlcm11YmFuKVxyXG4gICAgICAgICAgICBzZWxmLmNjVXNlcklucHV0ID0gJydcclxuICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTon5oqE6YCB5qC85byP6ZSZ6K+vJyxcclxuICAgICAgICAgICAgaW1hZ2U6Jy4uL2Fzc2V0cy93X2NoYS5wbmcnLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjoxMDAwXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgZm9ybWF0ID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYoc2VsZi5iY2NVc2VySW5wdXQhPT0nJyl7XHJcbiAgICAgICAgaWYocGF0dC50ZXN0KHNlbGYuYmNjVXNlcklucHV0KSl7XHJcbiAgICAgICAgICBsZXQgZXhpc3RiY2NhcnIgPSBmYWxzZVxyXG4gICAgICAgICAgbGV0IGV4aXN0dXNlcmxpc3QgPSBmYWxzZVxyXG4gICAgICAgICAgbGV0IGNhbnB1dCA9IHRydWVcclxuICAgICAgICAgIGxldCB1c2VyaW5kZXg7XHJcbiAgICAgICAgICBsZXQgdW11YmFuID0ge1xyXG4gICAgICAgICAgICB1c2VybmFtZTonJyxcclxuICAgICAgICAgICAgZW1haWw6JycsXHJcbiAgICAgICAgICAgIHNqQ2hlY2s6ZmFsc2UsXHJcbiAgICAgICAgICAgIGNjQ2hlY2s6ZmFsc2UsXHJcbiAgICAgICAgICAgIGJjY0NoZWNrOmZhbHNlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBzZWxmLlVzZXJMaXN0LnVzZXIuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcclxuICAgICAgICAgICAgaWYoc2VsZi5iY2NVc2VySW5wdXQ9PWl0ZW0uZW1haWwpe1xyXG4gICAgICAgICAgICAgIHVtdWJhbi5uYW1lID0gaXRlbS51c2VybmFtZVxyXG4gICAgICAgICAgICAgIHVtdWJhbi5lbWFpbCA9IGl0ZW0uZW1haWxcclxuICAgICAgICAgICAgICBleGlzdHVzZXJsaXN0ID0gdHJ1ZVxyXG4gICAgICAgICAgICAgIHVzZXJpbmRleCA9IGluZGV4XHJcbiAgICAgICAgICAgICAgZm9yKHZhciBpPTA7aTxzZWxmLmJjY0Fyci5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKHVtdWJhbi5lbWFpbD09c2VsZi5iY2NBcnJbaV0uZW1haWwpe1xyXG4gICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6J+W3suWtmOWcqOeUqOaItycsXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6Jy4uL2Fzc2V0cy93X2NoYS5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOjEwMDBcclxuICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgc2VsZi5iY2NVc2VySW5wdXQgPSAnJ1xyXG4gICAgICAgICAgICAgICAgICBjYW5wdXQgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICBmb3JtYXQgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICBleGlzdGJjY2FyciA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICBpZihleGlzdHVzZXJsaXN0PT1mYWxzZSl7XHJcbiAgICAgICAgICAgIGxldCBteW11YmFuID0ge1xyXG4gICAgICAgICAgICAgIHVzZXJuYW1lOnNlbGYuYmNjVXNlcklucHV0LFxyXG4gICAgICAgICAgICAgIGVtYWlsOnNlbGYuYmNjVXNlcklucHV0LFxyXG4gICAgICAgICAgICAgIHNqQ2hlY2s6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgY2NDaGVjazpmYWxzZSxcclxuICAgICAgICAgICAgICBiY2NDaGVjazpmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYuYmNjQXJyLmZvckVhY2goKGl0ZW0pPT57XHJcbiAgICAgICAgICAgICAgaWYobXltdWJhbi5lbWFpbD09aXRlbS5lbWFpbCl7XHJcbiAgICAgICAgICAgICAgICBjYW5wdXQgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHNlbGYuYmNjVXNlcklucHV0ID0gJydcclxuICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6J+W3suWtmOWcqOeUqOaItycsXHJcbiAgICAgICAgICAgICAgICAgIGltYWdlOicuLi9hc3NldHMvd19jaGEucG5nJyxcclxuICAgICAgICAgICAgICAgICAgZHVyYXRpb246MTAwMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pICAgXHJcbiAgICAgICAgICAgIGlmKGNhbnB1dCl7XHJcbiAgICAgICAgICAgICBzZWxmLmJjY0Fyci5wdXNoKG15bXViYW4pXHJcbiAgICAgICAgICAgICBzZWxmLmJjY1VzZXJJbnB1dCA9ICcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKGV4aXN0dXNlcmxpc3Q9PXRydWUmJmV4aXN0YmNjYXJyPT1mYWxzZSl7XHJcbiAgICAgICAgICAgIGxldCB1c2VybXViYW4gPSB7XHJcbiAgICAgICAgICAgICAgdXNlcm5hbWU6c2VsZi5Vc2VyTGlzdC51c2VyW3VzZXJpbmRleF0udXNlcm5hbWUsXHJcbiAgICAgICAgICAgICAgZW1haWw6c2VsZi5Vc2VyTGlzdC51c2VyW3VzZXJpbmRleF0uZW1haWwsXHJcbiAgICAgICAgICAgICAgc2pDaGVjazpmYWxzZSxcclxuICAgICAgICAgICAgICBjY0NoZWNrOmZhbHNlLFxyXG4gICAgICAgICAgICAgIGJjY0NoZWNrOmZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5iY2NBcnIucHVzaCh1c2VybXViYW4pXHJcbiAgICAgICAgICAgIHNlbGYuYmNjVXNlcklucHV0ID0gJydcclxuICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6J+WvhumAgeagvOW8j+mUmeivrycsXHJcbiAgICAgICAgICAgIGltYWdlOicuLi9hc3NldHMvd19jaGEucG5nJyxcclxuICAgICAgICAgICAgZHVyYXRpb246MTAwMFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIGZvcm1hdCA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmKGZvcm1hdCl7XHJcbiAgICAgIGxldCBzYXZlYmNjID0gW11cclxuICAgICAgc2VsZi5iY2NBcnIuZm9yRWFjaCgoaXRlbSk9PntcclxuICAgICAgICBsZXQgc2F2ZWJjY21iID0ge1xyXG4gICAgICAgICAgZW1haWw6JycsXHJcbiAgICAgICAgICBuYW1lOicnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNhdmViY2NtYi5lbWFpbCA9IGl0ZW0uZW1haWw7XHJcbiAgICAgICAgc2F2ZWJjY21iLm5hbWUgPSBpdGVtLnVzZXJuYW1lO1xyXG4gICAgICAgIHNhdmViY2MucHVzaChzYXZlYmNjbWIpXHJcbiAgICAgIH0pXHJcbiAgICAgIFxyXG4gICAgICBsZXQgc2F2ZWNjID0gW11cclxuICAgICAgc2VsZi5jY0Fyci5mb3JFYWNoKChpdGVtKT0+e1xyXG4gICAgICAgIGxldCBzYXZlY2NtYiA9IHtcclxuICAgICAgICAgIGVtYWlsOicnLFxyXG4gICAgICAgICAgbmFtZTonJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBzYXZlY2NtYi5lbWFpbCA9IGl0ZW0uZW1haWw7XHJcbiAgICAgICAgc2F2ZWNjbWIubmFtZSA9IGl0ZW0udXNlcm5hbWU7XHJcbiAgICAgICAgc2F2ZWNjLnB1c2goc2F2ZWNjbWIpXHJcbiAgICAgIH0pXHJcbiAgICAgIGxldCBzYXZlc2ogPSBbXVxyXG4gICAgICBzZWxmLnNqQXJyLmZvckVhY2goKGl0ZW0pPT57XHJcbiAgICAgICAgbGV0IHNhdmVzam1iID0ge1xyXG4gICAgICAgICAgZW1haWw6JycsXHJcbiAgICAgICAgICBuYW1lOicnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNhdmVzam1iLmVtYWlsID0gaXRlbS5lbWFpbDtcclxuICAgICAgICBzYXZlc2ptYi5uYW1lID0gaXRlbS51c2VybmFtZTtcclxuICAgICAgICBzYXZlc2oucHVzaChzYXZlc2ptYilcclxuICAgICAgfSlcclxuICAgICAgbGV0IGZyb20gPSB7XHJcbiAgICAgICAgZW1haWw6d2VweS5nZXRTdG9yYWdlU3luYygndXNlcm5hbWUnKSxcclxuICAgICAgICBuYW1lOndlcHkuZ2V0U3RvcmFnZVN5bmMoJ3VzZXJuYW1lJylcclxuICAgICAgfVxyXG4gICAgICBsZXQgY29tcG9zZUlkID0gc2VsZi5jb21wb3NlSWRcclxuICAgICAgbGV0IG15ZGF0YSA9IHtcclxuICAgICAgICBiY2M6c2F2ZWJjYyxcclxuICAgICAgICBib2R5OnNlbGYudGV4dFRoZW1lLFxyXG4gICAgICAgIGNjOnNhdmVjYyxcclxuICAgICAgICBjb21wb3NlX2lkOmNvbXBvc2VJZCxcclxuICAgICAgICBmcm9tOmZyb20sXHJcbiAgICAgICAgaHRtbDpmYWxzZSxcclxuICAgICAgICBwcmlvcml0eTowLFxyXG4gICAgICAgIHJlY2VpcHQ6dHJ1ZSxcclxuICAgICAgICBzY2hlZHVsZTonMTAnLFxyXG4gICAgICAgIHN1YmplY3Q6c2VsZi5zdWJqZWN0LFxyXG4gICAgICAgIHRvOnNhdmVzalxyXG4gICAgICB9XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKG15ZGF0YSlcclxuICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICB1cmw6ICdodHRwczovL2R5d3N3ZWIuY29tL2RyYWZ0X3NhdmUnLFxyXG4gICAgICAgIGRhdGE6IG15ZGF0YSxcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+S/neWtmOaIkOWKnycsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHNlbmRNYWlsKCl7XHJcbiAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICBsZXQgcGF0dCA9IC9eKFxcdykrKFxcLlxcdyspKkAoXFx3KSsoKFxcLlxcd3syLDN9KXsxLDN9KSQvO1xyXG4gICAgICBsZXQgZm9ybWF0ID0gdHJ1ZVxyXG4gICAgICBpZihzZWxmLnNqVXNlcklucHV0IT09Jycpe1xyXG4gICAgICAgIGlmKHBhdHQudGVzdChzZWxmLnNqVXNlcklucHV0KSl7XHJcbiAgICAgICAgICBsZXQgZXhpc3RzamFyciA9IGZhbHNlXHJcbiAgICAgICAgICBsZXQgZXhpc3R1c2VybGlzdCA9IGZhbHNlXHJcbiAgICAgICAgICBsZXQgY2FucHV0ID0gdHJ1ZVxyXG4gICAgICAgICAgbGV0IHVzZXJpbmRleDtcclxuICAgICAgICAgIGxldCB1bXViYW4gPSB7XHJcbiAgICAgICAgICAgIHVzZXJuYW1lOicnLFxyXG4gICAgICAgICAgICBlbWFpbDonJyxcclxuICAgICAgICAgICAgc2pDaGVjazpmYWxzZSxcclxuICAgICAgICAgICAgY2NDaGVjazpmYWxzZSxcclxuICAgICAgICAgICAgYmNjQ2hlY2s6ZmFsc2VcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHNlbGYuVXNlckxpc3QudXNlci5mb3JFYWNoKChpdGVtLGluZGV4KT0+e1xyXG4gICAgICAgICAgICBpZihzZWxmLnNqVXNlcklucHV0PT1pdGVtLmVtYWlsKXtcclxuICAgICAgICAgICAgICB1bXViYW4ubmFtZSA9IGl0ZW0udXNlcm5hbWVcclxuICAgICAgICAgICAgICB1bXViYW4uZW1haWwgPSBpdGVtLmVtYWlsXHJcbiAgICAgICAgICAgICAgZXhpc3R1c2VybGlzdCA9IHRydWVcclxuICAgICAgICAgICAgICB1c2VyaW5kZXggPSBpbmRleFxyXG4gICAgICAgICAgICAgIGZvcih2YXIgaT0wO2k8c2VsZi5zakFyci5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKHVtdWJhbi5lbWFpbD09c2VsZi5zakFycltpXS5lbWFpbCl7XHJcbiAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTon5bey5a2Y5Zyo55So5oi3JyxcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZTonLi4vYXNzZXRzL3dfY2hhLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246MTAwMFxyXG4gICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICBzZWxmLnNqVXNlcklucHV0ID0gJydcclxuICAgICAgICAgICAgICAgICAgY2FucHV0ID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgZm9ybWF0ID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgZXhpc3RzamFyciA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICBpZihleGlzdHVzZXJsaXN0PT1mYWxzZSl7XHJcbiAgICAgICAgICAgIGxldCBteW11YmFuID0ge1xyXG4gICAgICAgICAgICAgIHVzZXJuYW1lOnNlbGYuc2pVc2VySW5wdXQsXHJcbiAgICAgICAgICAgICAgZW1haWw6c2VsZi5zalVzZXJJbnB1dCxcclxuICAgICAgICAgICAgICBzakNoZWNrOmZhbHNlLFxyXG4gICAgICAgICAgICAgIGNjQ2hlY2s6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgYmNjQ2hlY2s6ZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLnNqQXJyLmZvckVhY2goKGl0ZW0pPT57XHJcbiAgICAgICAgICAgICAgaWYobXltdWJhbi5lbWFpbD09aXRlbS5lbWFpbCl7XHJcbiAgICAgICAgICAgICAgICBjYW5wdXQgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHNlbGYuc2pVc2VySW5wdXQgPSAnJ1xyXG4gICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTon5bey5a2Y5Zyo55So5oi3JyxcclxuICAgICAgICAgICAgICAgICAgaW1hZ2U6Jy4uL2Fzc2V0cy93X2NoYS5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICBkdXJhdGlvbjoxMDAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkgICBcclxuICAgICAgICAgICAgaWYoY2FucHV0KXtcclxuICAgICAgICAgICAgIHNlbGYuc2pBcnIucHVzaChteW11YmFuKVxyXG4gICAgICAgICAgICAgc2VsZi5zalVzZXJJbnB1dCA9ICcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKGV4aXN0dXNlcmxpc3Q9PXRydWUmJmV4aXN0c2phcnI9PWZhbHNlKXtcclxuICAgICAgICAgICAgbGV0IHVzZXJtdWJhbiA9IHtcclxuICAgICAgICAgICAgICB1c2VybmFtZTpzZWxmLlVzZXJMaXN0LnVzZXJbdXNlcmluZGV4XS51c2VybmFtZSxcclxuICAgICAgICAgICAgICBlbWFpbDpzZWxmLlVzZXJMaXN0LnVzZXJbdXNlcmluZGV4XS5lbWFpbCxcclxuICAgICAgICAgICAgICBzakNoZWNrOmZhbHNlLFxyXG4gICAgICAgICAgICAgIGNjQ2hlY2s6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgYmNjQ2hlY2s6ZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLnNqQXJyLnB1c2godXNlcm11YmFuKVxyXG4gICAgICAgICAgICBzZWxmLnNqVXNlcklucHV0ID0gJydcclxuICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIGlmKHNlbGYuc2pVc2VySW5wdXQ9PT1udWxsKXtcclxuICAgICAgICAgICAgZm9ybWF0ID0gdHJ1ZVxyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICB0aXRsZTon5pS25Lu25Lq65qC85byP6ZSZ6K+vJyxcclxuICAgICAgICAgICAgICBpbWFnZTonLi4vYXNzZXRzL3dfY2hhLnBuZycsXHJcbiAgICAgICAgICAgICAgZHVyYXRpb246MTAwMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBmb3JtYXQgPSBmYWxzZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZihzZWxmLmNjVXNlcklucHV0IT09Jycpe1xyXG4gICAgICAgIGlmKHBhdHQudGVzdChzZWxmLmNjVXNlcklucHV0KSl7XHJcbiAgICAgICAgICBsZXQgZXhpc3RjY2FyciA9IGZhbHNlXHJcbiAgICAgICAgICBsZXQgZXhpc3R1c2VybGlzdCA9IGZhbHNlXHJcbiAgICAgICAgICBsZXQgY2FucHV0ID0gdHJ1ZVxyXG4gICAgICAgICAgbGV0IHVzZXJpbmRleDtcclxuICAgICAgICAgIGxldCB1bXViYW4gPSB7XHJcbiAgICAgICAgICAgIHVzZXJuYW1lOicnLFxyXG4gICAgICAgICAgICBlbWFpbDonJyxcclxuICAgICAgICAgICAgc2pDaGVjazpmYWxzZSxcclxuICAgICAgICAgICAgY2NDaGVjazpmYWxzZSxcclxuICAgICAgICAgICAgYmNjQ2hlY2s6ZmFsc2VcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHNlbGYuVXNlckxpc3QudXNlci5mb3JFYWNoKChpdGVtLGluZGV4KT0+e1xyXG4gICAgICAgICAgICBpZihzZWxmLmNjVXNlcklucHV0PT1pdGVtLmVtYWlsKXtcclxuICAgICAgICAgICAgICB1bXViYW4ubmFtZSA9IGl0ZW0udXNlcm5hbWVcclxuICAgICAgICAgICAgICB1bXViYW4uZW1haWwgPSBpdGVtLmVtYWlsXHJcbiAgICAgICAgICAgICAgZXhpc3R1c2VybGlzdCA9IHRydWVcclxuICAgICAgICAgICAgICB1c2VyaW5kZXggPSBpbmRleFxyXG4gICAgICAgICAgICAgIGZvcih2YXIgaT0wO2k8c2VsZi5jY0Fyci5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKHVtdWJhbi5lbWFpbD09c2VsZi5jY0FycltpXS5lbWFpbCl7XHJcbiAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTon5bey5a2Y5Zyo55So5oi3JyxcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZTonLi4vYXNzZXRzL3dfY2hhLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246MTAwMFxyXG4gICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICBzZWxmLmNjVXNlcklucHV0ID0gJydcclxuICAgICAgICAgICAgICAgICAgY2FucHV0ID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgZm9ybWF0ID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgZXhpc3RjY2FyciA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICBpZihleGlzdHVzZXJsaXN0PT1mYWxzZSl7XHJcbiAgICAgICAgICAgIGxldCBteW11YmFuID0ge1xyXG4gICAgICAgICAgICAgIHVzZXJuYW1lOnNlbGYuY2NVc2VySW5wdXQsXHJcbiAgICAgICAgICAgICAgZW1haWw6c2VsZi5jY1VzZXJJbnB1dCxcclxuICAgICAgICAgICAgICBzakNoZWNrOmZhbHNlLFxyXG4gICAgICAgICAgICAgIGNjQ2hlY2s6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgYmNjQ2hlY2s6ZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLmNjQXJyLmZvckVhY2goKGl0ZW0pPT57XHJcbiAgICAgICAgICAgICAgaWYobXltdWJhbi5lbWFpbD09aXRlbS5lbWFpbCl7XHJcbiAgICAgICAgICAgICAgICBjYW5wdXQgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHNlbGYuY2NVc2VySW5wdXQgPSAnJ1xyXG4gICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTon5bey5a2Y5Zyo55So5oi3JyxcclxuICAgICAgICAgICAgICAgICAgaW1hZ2U6Jy4uL2Fzc2V0cy93X2NoYS5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICBkdXJhdGlvbjoxMDAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkgICBcclxuICAgICAgICAgICAgaWYoY2FucHV0KXtcclxuICAgICAgICAgICAgIHNlbGYuY2NBcnIucHVzaChteW11YmFuKVxyXG4gICAgICAgICAgICAgc2VsZi5jY1VzZXJJbnB1dCA9ICcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKGV4aXN0dXNlcmxpc3Q9PXRydWUmJmV4aXN0Y2NhcnI9PWZhbHNlKXtcclxuICAgICAgICAgICAgbGV0IHVzZXJtdWJhbiA9IHtcclxuICAgICAgICAgICAgICB1c2VybmFtZTpzZWxmLlVzZXJMaXN0LnVzZXJbdXNlcmluZGV4XS51c2VybmFtZSxcclxuICAgICAgICAgICAgICBlbWFpbDpzZWxmLlVzZXJMaXN0LnVzZXJbdXNlcmluZGV4XS5lbWFpbCxcclxuICAgICAgICAgICAgICBzakNoZWNrOmZhbHNlLFxyXG4gICAgICAgICAgICAgIGNjQ2hlY2s6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgYmNjQ2hlY2s6ZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLmNjQXJyLnB1c2godXNlcm11YmFuKVxyXG4gICAgICAgICAgICBzZWxmLmNjVXNlcklucHV0ID0gJydcclxuICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIGlmKHNlbGYuY2NVc2VySW5wdXQ9PT1udWxsKXtcclxuICAgICAgICAgICAgZm9ybWF0ID0gdHJ1ZVxyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICB0aXRsZTon5oqE6YCB55So5oi35qC85byP6ZSZ6K+vJyxcclxuICAgICAgICAgICAgICBpbWFnZTonLi4vYXNzZXRzL3dfY2hhLnBuZycsXHJcbiAgICAgICAgICAgICAgZHVyYXRpb246MTAwMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBmb3JtYXQgPSBmYWxzZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZihzZWxmLmJjY1VzZXJJbnB1dCE9PScnKXtcclxuICAgICAgICBpZihwYXR0LnRlc3Qoc2VsZi5iY2NVc2VySW5wdXQpKXtcclxuICAgICAgICAgIGxldCBleGlzdGJjY2FyciA9IGZhbHNlXHJcbiAgICAgICAgICBsZXQgZXhpc3R1c2VybGlzdCA9IGZhbHNlXHJcbiAgICAgICAgICBsZXQgY2FucHV0ID0gdHJ1ZVxyXG4gICAgICAgICAgbGV0IHVzZXJpbmRleDtcclxuICAgICAgICAgIGxldCB1bXViYW4gPSB7XHJcbiAgICAgICAgICAgIHVzZXJuYW1lOicnLFxyXG4gICAgICAgICAgICBlbWFpbDonJyxcclxuICAgICAgICAgICAgc2pDaGVjazpmYWxzZSxcclxuICAgICAgICAgICAgY2NDaGVjazpmYWxzZSxcclxuICAgICAgICAgICAgYmNjQ2hlY2s6ZmFsc2VcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHNlbGYuVXNlckxpc3QudXNlci5mb3JFYWNoKChpdGVtLGluZGV4KT0+e1xyXG4gICAgICAgICAgICBpZihzZWxmLmJjY1VzZXJJbnB1dD09aXRlbS5lbWFpbCl7XHJcbiAgICAgICAgICAgICAgdW11YmFuLm5hbWUgPSBpdGVtLnVzZXJuYW1lXHJcbiAgICAgICAgICAgICAgdW11YmFuLmVtYWlsID0gaXRlbS5lbWFpbFxyXG4gICAgICAgICAgICAgIGV4aXN0dXNlcmxpc3QgPSB0cnVlXHJcbiAgICAgICAgICAgICAgdXNlcmluZGV4ID0gaW5kZXhcclxuICAgICAgICAgICAgICBmb3IodmFyIGk9MDtpPHNlbGYuYmNjQXJyLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYodW11YmFuLmVtYWlsPT1zZWxmLmJjY0FycltpXS5lbWFpbCl7XHJcbiAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTon5bey5a2Y5Zyo55So5oi3JyxcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZTonLi4vYXNzZXRzL3dfY2hhLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246MTAwMFxyXG4gICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICBzZWxmLmJjY1VzZXJJbnB1dCA9ICcnXHJcbiAgICAgICAgICAgICAgICAgIGNhbnB1dCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgIGZvcm1hdCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgIGV4aXN0YmNjYXJyID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIGlmKGV4aXN0dXNlcmxpc3Q9PWZhbHNlKXtcclxuICAgICAgICAgICAgbGV0IG15bXViYW4gPSB7XHJcbiAgICAgICAgICAgICAgdXNlcm5hbWU6c2VsZi5iY2NVc2VySW5wdXQsXHJcbiAgICAgICAgICAgICAgZW1haWw6c2VsZi5iY2NVc2VySW5wdXQsXHJcbiAgICAgICAgICAgICAgc2pDaGVjazpmYWxzZSxcclxuICAgICAgICAgICAgICBjY0NoZWNrOmZhbHNlLFxyXG4gICAgICAgICAgICAgIGJjY0NoZWNrOmZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5iY2NBcnIuZm9yRWFjaCgoaXRlbSk9PntcclxuICAgICAgICAgICAgICBpZihteW11YmFuLmVtYWlsPT1pdGVtLmVtYWlsKXtcclxuICAgICAgICAgICAgICAgIGNhbnB1dCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgc2VsZi5iY2NVc2VySW5wdXQgPSAnJ1xyXG4gICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTon5bey5a2Y5Zyo55So5oi3JyxcclxuICAgICAgICAgICAgICAgICAgaW1hZ2U6Jy4uL2Fzc2V0cy93X2NoYS5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICBkdXJhdGlvbjoxMDAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkgICBcclxuICAgICAgICAgICAgaWYoY2FucHV0KXtcclxuICAgICAgICAgICAgIHNlbGYuYmNjQXJyLnB1c2gobXltdWJhbilcclxuICAgICAgICAgICAgIHNlbGYuYmNjVXNlcklucHV0ID0gJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYoZXhpc3R1c2VybGlzdD09dHJ1ZSYmZXhpc3RiY2NhcnI9PWZhbHNlKXtcclxuICAgICAgICAgICAgbGV0IHVzZXJtdWJhbiA9IHtcclxuICAgICAgICAgICAgICB1c2VybmFtZTpzZWxmLlVzZXJMaXN0LnVzZXJbdXNlcmluZGV4XS51c2VybmFtZSxcclxuICAgICAgICAgICAgICBlbWFpbDpzZWxmLlVzZXJMaXN0LnVzZXJbdXNlcmluZGV4XS5lbWFpbCxcclxuICAgICAgICAgICAgICBzakNoZWNrOmZhbHNlLFxyXG4gICAgICAgICAgICAgIGNjQ2hlY2s6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgYmNjQ2hlY2s6ZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLmJjY0Fyci5wdXNoKHVzZXJtdWJhbilcclxuICAgICAgICAgICAgc2VsZi5iY2NVc2VySW5wdXQgPSAnJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgaWYoc2VsZi5iY2NVc2VySW5wdXQ9PT1udWxsKXtcclxuICAgICAgICAgICAgZm9ybWF0ID0gdHJ1ZVxyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICB0aXRsZTon5a+G6YCB55So5oi35qC85byP6ZSZ6K+vJyxcclxuICAgICAgICAgICAgICBpbWFnZTonLi4vYXNzZXRzL3dfY2hhLnBuZycsXHJcbiAgICAgICAgICAgICAgZHVyYXRpb246MTAwMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBmb3JtYXQgPSBmYWxzZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZihmb3JtYXQpe1xyXG4gICAgICBsZXQgc2F2ZWJjYyA9IFtdXHJcbiAgICAgIHNlbGYuYmNjQXJyLmZvckVhY2goKGl0ZW0pPT57XHJcbiAgICAgICAgbGV0IHNhdmViY2NtYiA9IHtcclxuICAgICAgICAgIGVtYWlsOicnLFxyXG4gICAgICAgICAgbmFtZTonJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBzYXZlYmNjbWIuZW1haWwgPSBpdGVtLmVtYWlsO1xyXG4gICAgICAgIHNhdmViY2NtYi5uYW1lID0gaXRlbS51c2VybmFtZTtcclxuICAgICAgICBzYXZlYmNjLnB1c2goc2F2ZWJjY21iKVxyXG4gICAgICB9KVxyXG4gICAgICBcclxuICAgICAgbGV0IHNhdmVjYyA9IFtdXHJcbiAgICAgIHNlbGYuY2NBcnIuZm9yRWFjaCgoaXRlbSk9PntcclxuICAgICAgICBsZXQgc2F2ZWNjbWIgPSB7XHJcbiAgICAgICAgICBlbWFpbDonJyxcclxuICAgICAgICAgIG5hbWU6JydcclxuICAgICAgICB9XHJcbiAgICAgICAgc2F2ZWNjbWIuZW1haWwgPSBpdGVtLmVtYWlsO1xyXG4gICAgICAgIHNhdmVjY21iLm5hbWUgPSBpdGVtLnVzZXJuYW1lO1xyXG4gICAgICAgIHNhdmVjYy5wdXNoKHNhdmVjY21iKVxyXG4gICAgICB9KVxyXG4gICAgICBsZXQgc2F2ZXNqID0gW11cclxuICAgICAgc2VsZi5zakFyci5mb3JFYWNoKChpdGVtKT0+e1xyXG4gICAgICAgIGxldCBzYXZlc2ptYiA9IHtcclxuICAgICAgICAgIGVtYWlsOicnLFxyXG4gICAgICAgICAgbmFtZTonJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBzYXZlc2ptYi5lbWFpbCA9IGl0ZW0uZW1haWw7XHJcbiAgICAgICAgc2F2ZXNqbWIubmFtZSA9IGl0ZW0udXNlcm5hbWU7XHJcbiAgICAgICAgc2F2ZXNqLnB1c2goc2F2ZXNqbWIpXHJcbiAgICAgIH0pXHJcbiAgICAgIGxldCBmcm9tID0ge1xyXG4gICAgICAgIGVtYWlsOndlcHkuZ2V0U3RvcmFnZVN5bmMoJ3VzZXJuYW1lJyksXHJcbiAgICAgICAgbmFtZTp3ZXB5LmdldFN0b3JhZ2VTeW5jKCd1c2VybmFtZScpXHJcbiAgICAgIH1cclxuICAgICAgbGV0IGNvbXBvc2VJZCA9IHNlbGYuY29tcG9zZUlkXHJcbiAgICAgIGxldCBteWRhdGEgPSB7XHJcbiAgICAgICAgYmNjOnNhdmViY2MsXHJcbiAgICAgICAgYm9keTpzZWxmLnRleHRUaGVtZSxcclxuICAgICAgICBjYzpzYXZlY2MsXHJcbiAgICAgICAgY29tcG9zZV9pZDpjb21wb3NlSWQsXHJcbiAgICAgICAgZnJvbTpmcm9tLFxyXG4gICAgICAgIGh0bWw6ZmFsc2UsXHJcbiAgICAgICAgcHJpb3JpdHk6MCxcclxuICAgICAgICByZWNlaXB0OnRydWUsXHJcbiAgICAgICAgc2NoZWR1bGU6JzEwJyxcclxuICAgICAgICBzdWJqZWN0OnNlbGYuc3ViamVjdCxcclxuICAgICAgICB0bzpzYXZlc2pcclxuICAgICAgfVxyXG4gICAgICAvLyBjb25zb2xlLmxvZyhteWRhdGEpXHJcbiAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly9keXdzd2ViLmNvbS9tc2dfc2VuZCcsXHJcbiAgICAgICAgZGF0YTogbXlkYXRhLFxyXG4gICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn5Y+R6YCB5oiQ5YqfJyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgbG9zdHNqZm9jdXMoKXtcclxuICAgICAgICB0aGlzLnNqRm9jdXMgPSBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgICBsb3N0Y2Nmb2N1cygpe1xyXG4gICAgICAgIHRoaXMuY2NGb2N1cyA9IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIGxvc3RiY2Nmb2N1cygpe1xyXG4gICAgICAgIHRoaXMuYmNjRm9jdXMgPSBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgICBjaGFuZ2VTakZvY3VzKCl7XHJcbiAgICAgICAgdGhpcy5zakZvY3VzID0gdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICBjaGFuZ2VDY0ZvY3VzKCl7XHJcbiAgICAgICAgdGhpcy5jY0ZvY3VzID0gdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICBjaGFuZ2VCY2NGb2N1cygpe1xyXG4gICAgICAgIHRoaXMuYmNjRm9jdXMgPSB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgIHVzZXJNZXRob2RzKGVtYWlsLGtleSl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgdmFyIHVzZXJuYW1lO1xyXG4gICAgICAgIHNlbGYuVXNlckxpc3QudXNlci5mb3JFYWNoKChpdGVtKT0+e1xyXG4gICAgICAgICAgaWYoZW1haWw9PWl0ZW0uZW1haWwpe1xyXG4gICAgICAgICAgICB1c2VybmFtZSA9IGl0ZW0udXNlcm5hbWVcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmKGtleT09J3NqJyl7XHJcbiAgICAgICAgICBzZWxmLmhhc1NqVXNlcmNoZWNrID0gdHJ1ZVxyXG4gICAgICAgICAgc2VsZi5zakFyci5mb3JFYWNoKChpdGVtKT0+e1xyXG4gICAgICAgICAgICBpZihlbWFpbD09aXRlbS5lbWFpbCl7XHJcbiAgICAgICAgICAgICAgaXRlbS5zakNoZWNrID0gdHJ1ZVxyXG4gICAgICAgICAgICAgIHNlbGYuc2pjdW5hbWUgPSBpdGVtLnVzZXJuYW1lXHJcbiAgICAgICAgICAgICAgc2VsZi5zamN1ZW1haWwgPSBpdGVtLmVtYWlsXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIGl0ZW0uc2pDaGVjayA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pIFxyXG4gICAgICAgIH1lbHNlIGlmKGtleT09J2NjJyl7XHJcbiAgICAgICAgICBzZWxmLmhhc0NjVXNlcmNoZWNrID0gdHJ1ZVxyXG4gICAgICAgICAgc2VsZi5jY0Fyci5mb3JFYWNoKChpdGVtKT0+e1xyXG4gICAgICAgICAgICBpZihlbWFpbD09aXRlbS5lbWFpbCl7XHJcbiAgICAgICAgICAgICAgaXRlbS5jY0NoZWNrID0gdHJ1ZVxyXG4gICAgICAgICAgICAgIHNlbGYuY2NjdW5hbWUgPSBpdGVtLnVzZXJuYW1lXHJcbiAgICAgICAgICAgICAgc2VsZi5jY2N1ZW1haWwgPSBpdGVtLmVtYWlsXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIGl0ZW0uY2NDaGVjayA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pIFxyXG4gICAgICAgIH1lbHNlIGlmKGtleT09J2JjYycpe1xyXG4gICAgICAgICAgc2VsZi5oYXNCY2NVc2VyY2hlY2sgPSB0cnVlXHJcbiAgICAgICAgICBzZWxmLmJjY0Fyci5mb3JFYWNoKChpdGVtKT0+e1xyXG4gICAgICAgICAgICBpZihlbWFpbD09aXRlbS5lbWFpbCl7XHJcbiAgICAgICAgICAgICAgaXRlbS5iY2NDaGVjayA9IHRydWVcclxuICAgICAgICAgICAgICBzZWxmLmJjY2N1bmFtZSA9IGl0ZW0udXNlcm5hbWVcclxuICAgICAgICAgICAgICBzZWxmLmJjY2N1ZW1haWwgPSBpdGVtLmVtYWlsXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIGl0ZW0uYmNjQ2hlY2sgPSBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KSBcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHBpY2tBcnIoZSl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzIFxyXG4gICAgICAgIGxldCBzeSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgbGV0IHVzZXJuYW1lID0gc2VsZi5Vc2VyTGlzdC51c2VyW3N5XS51c2VybmFtZVxyXG4gICAgICAgIGxldCBrZXl3b3JkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQua2V5d29yZFxyXG4gICAgICAgIGxldCBoYXNwZW9wbGUgPSBmYWxzZVxyXG4gICAgICAgIGlmKHN5PjApe1xyXG4gICAgICAgICAgaWYoa2V5d29yZD09J3NqJyl7XHJcbiAgICAgICAgICAgIGxldCBwdXRlbWFpbCA9IHNlbGYuVXNlckxpc3QudXNlcltzeV0uZW1haWwgICAgIFxyXG4gICAgICAgICAgICBpZihzZWxmLnNqQXJyLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICBzZWxmLnNqQXJyLmZvckVhY2goKGl0ZW0pPT57XHJcbiAgICAgICAgICAgICAgICBpZihpdGVtLmVtYWlsPT1wdXRlbWFpbCl7XHJcbiAgICAgICAgICAgICAgICAgIGhhc3Blb3BsZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5bey5a2Y5Zyo55So5oi3JyxcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZTonLi4vYXNzZXRzL3dfY2hhLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIGlmKGhhc3Blb3BsZSl7XHJcblxyXG4gICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zakFyci5wdXNoKHNlbGYuVXNlckxpc3QudXNlcltzeV0pXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICBzZWxmLnNqQXJyLnB1c2goc2VsZi5Vc2VyTGlzdC51c2VyW3N5XSlcclxuICAgICAgICAgICAgfSAgICAgICBcclxuICAgICAgICAgIH1lbHNlIGlmKGtleXdvcmQ9PSdjYycpe1xyXG4gICAgICAgICAgICBsZXQgcHV0ZW1haWwgPSBzZWxmLlVzZXJMaXN0LnVzZXJbc3ldLmVtYWlsICAgICBcclxuICAgICAgICAgICAgaWYoc2VsZi5jY0Fyci5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgc2VsZi5jY0Fyci5mb3JFYWNoKChpdGVtKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoaXRlbS5lbWFpbD09cHV0ZW1haWwpe1xyXG4gICAgICAgICAgICAgICAgICBoYXNwZW9wbGUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+W3suWtmOWcqOeUqOaItycsXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6Jy4uL2Fzc2V0cy93X2NoYS5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICBpZihoYXNwZW9wbGUpe1xyXG5cclxuICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHNlbGYuY2NBcnIucHVzaChzZWxmLlVzZXJMaXN0LnVzZXJbc3ldKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgc2VsZi5jY0Fyci5wdXNoKHNlbGYuVXNlckxpc3QudXNlcltzeV0pXHJcbiAgICAgICAgICAgIH0gICAgIFxyXG4gICAgICAgICAgfWVsc2UgaWYoa2V5d29yZD09J2JjYycpe1xyXG4gICAgICAgICAgICBsZXQgcHV0ZW1haWwgPSBzZWxmLlVzZXJMaXN0LnVzZXJbc3ldLmVtYWlsICAgICBcclxuICAgICAgICAgICAgaWYoc2VsZi5iY2NBcnIubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgIHNlbGYuYmNjQXJyLmZvckVhY2goKGl0ZW0pPT57XHJcbiAgICAgICAgICAgICAgICBpZihpdGVtLmVtYWlsPT1wdXRlbWFpbCl7XHJcbiAgICAgICAgICAgICAgICAgIGhhc3Blb3BsZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5bey5a2Y5Zyo55So5oi3JyxcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZTonLi4vYXNzZXRzL3dfY2hhLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIGlmKGhhc3Blb3BsZSl7XHJcblxyXG4gICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgc2VsZi5iY2NBcnIucHVzaChzZWxmLlVzZXJMaXN0LnVzZXJbc3ldKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgc2VsZi5iY2NBcnIucHVzaChzZWxmLlVzZXJMaXN0LnVzZXJbc3ldKVxyXG4gICAgICAgICAgICB9ICAgICBcclxuICAgICAgICAgIH0gXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn6K+36YCJ5oup55So5oi3JyxcclxuICAgICAgICAgICAgaW1hZ2U6Jy4uL2Fzc2V0cy93X2NoYS5wbmcnLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgIH0sXHJcbiAgICAgIHB1dGluQXJyKGUpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIGxldCBpbnB1dHZhbHVlID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICBsZXQgcHV0ZW1haWw7XHJcbiAgICAgICAgbGV0IGtleSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmtleXdvcmRcclxuICAgICAgICBsZXQgcGF0dCA9IC9eKFxcdykrKFxcLlxcdyspKkAoXFx3KSsoKFxcLlxcd3syLDN9KXsxLDN9KSQvO1xyXG4gICAgICAgIGlmKGtleT09J3NqJyl7XHJcbiAgICAgICAgICBzZWxmLnNqVXNlcklucHV0ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9ZWxzZSBpZihrZXk9PSdjYycpe1xyXG4gICAgICAgICAgc2VsZi5jY1VzZXJJbnB1dCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICBzZWxmLmJjY1VzZXJJbnB1dCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlucHV0dmFsdWUuaW5kZXhPZignOycpPjApe1xyXG4gICAgICAgICAgaWYocGF0dC50ZXN0KGlucHV0dmFsdWUuc3Vic3RyKDAsaW5wdXR2YWx1ZS5sZW5ndGgtMSkpKXtcclxuICAgICAgICAgICAgbGV0IGNoZWNrZW1haWwgPSBpbnB1dHZhbHVlLnN1YnN0cigwLGlucHV0dmFsdWUubGVuZ3RoLTEpXHJcbiAgICAgICAgICAgIGxldCBoYXNlbWFpbCA9IGZhbHNlXHJcbiAgICAgICAgICAgIGxldCBhcnJoYXNlbWFpbCA9IGZhbHNlXHJcbiAgICAgICAgICAgIGxldCBuZXdlbWFpbCA9IHtcclxuICAgICAgICAgICAgICB1c2VybmFtZTonJyxcclxuICAgICAgICAgICAgICBlbWFpbDonJyxcclxuICAgICAgICAgICAgICBzakNoZWNrOmZhbHNlLFxyXG4gICAgICAgICAgICAgIGNjQ2hlY2s6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgYmNjQ2hlY2s6ZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLlVzZXJMaXN0LnVzZXIuZm9yRWFjaCgoaXRlbSk9PntcclxuICAgICAgICAgICAgICBpZihjaGVja2VtYWlsPT1pdGVtLmVtYWlsKXtcclxuICAgICAgICAgICAgICAgIG5ld2VtYWlsLnVzZXJuYW1lID0gaXRlbS51c2VybmFtZTtcclxuICAgICAgICAgICAgICAgIG5ld2VtYWlsLmVtYWlsID0gaXRlbS5lbWFpbFxyXG4gICAgICAgICAgICAgICAgaGFzZW1haWwgPSB0cnVlXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgaWYoa2V5PT0nc2onKXtcclxuICAgICAgICAgICAgICAgICBpZihoYXNlbWFpbCl7XHJcbiAgICAgICAgICAgICAgICAgIGxldCBhcnJoYXNlbWFpbCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgIHNlbGYuc2pBcnIuZm9yRWFjaCgoaXRlbSk9PntcclxuICAgICAgICAgICAgICAgICAgICBpZihuZXdlbWFpbC5lbWFpbD09aXRlbS5lbWFpbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICBhcnJoYXNlbWFpbCA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIGlmKGFycmhhc2VtYWlsKXtcclxuICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+W3sue7j+WtmOWcqOeUqOaItycsXHJcbiAgICAgICAgICAgICAgICAgICAgICBpbWFnZTonLi4vYXNzZXRzL3dfY2hhLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zalVzZXJJbnB1dCA9IG51bGxcclxuICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zakFyci5wdXNoKG5ld2VtYWlsKVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2pVc2VySW5wdXQgPSBudWxsXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgbGV0IGhhc2FycmVtYWlsID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgbGV0IHVtdWJhbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTppbnB1dHZhbHVlLnN1YnN0cigwLGlucHV0dmFsdWUubGVuZ3RoLTEpLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOmlucHV0dmFsdWUuc3Vic3RyKDAsaW5wdXR2YWx1ZS5sZW5ndGgtMSksXHJcbiAgICAgICAgICAgICAgICAgICAgc2pDaGVjazpmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjY0NoZWNrOmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGJjY0NoZWNrOmZhbHNlXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgc2VsZi5zakFyci5mb3JFYWNoKChpdGVtKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHVtdWJhbi5lbWFpbD09aXRlbS5lbWFpbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICBoYXNhcnJlbWFpbCA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIGlmKGhhc2FycmVtYWlsKXtcclxuICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+W3sue7j+WtmOWcqOeUqOaItycsXHJcbiAgICAgICAgICAgICAgICAgICAgICBpbWFnZTonLi4vYXNzZXRzL3dfY2hhLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zalVzZXJJbnB1dCA9IG51bGxcclxuICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zakFyci5wdXNoKHVtdWJhbilcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNqVXNlcklucHV0ID0gbnVsbFxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgfWVsc2UgaWYoa2V5PT0nY2MnKXtcclxuICAgICAgICAgICAgICAgIGlmKGhhc2VtYWlsKXtcclxuICAgICAgICAgICAgICAgICBsZXQgYXJyaGFzZW1haWwgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICBzZWxmLmNjQXJyLmZvckVhY2goKGl0ZW0pPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYobmV3ZW1haWwuZW1haWw9PWl0ZW0uZW1haWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgYXJyaGFzZW1haWwgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICBpZihhcnJoYXNlbWFpbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICflt7Lnu4/lrZjlnKjnlKjmiLcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgaW1hZ2U6Jy4uL2Fzc2V0cy93X2NoYS5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2NVc2VySW5wdXQgPSBudWxsXHJcbiAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2NBcnIucHVzaChuZXdlbWFpbClcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgbGV0IHVtdWJhbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTppbnB1dHZhbHVlLnN1YnN0cigwLGlucHV0dmFsdWUubGVuZ3RoLTEpLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOmlucHV0dmFsdWUuc3Vic3RyKDAsaW5wdXR2YWx1ZS5sZW5ndGgtMSksXHJcbiAgICAgICAgICAgICAgICAgICAgc2pDaGVjazpmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjY0NoZWNrOmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGJjY0NoZWNrOmZhbHNlXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgbGV0IGhhc2FycmVtYWlsID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgc2VsZi5jY0Fyci5mb3JFYWNoKChpdGVtKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHVtdWJhbi5lbWFpbD09aXRlbS5lbWFpbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICBoYXNhcnJlbWFpbCA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIGlmKGhhc2FycmVtYWlsKXtcclxuICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+W3sue7j+WtmOWcqOeUqOaItycsXHJcbiAgICAgICAgICAgICAgICAgICAgICBpbWFnZTonLi4vYXNzZXRzL3dfY2hhLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jY1VzZXJJbnB1dCA9IG51bGxcclxuICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jY0Fyci5wdXNoKHVtdWJhbilcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNjVXNlcklucHV0ID0gbnVsbFxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKGhhc2VtYWlsKXtcclxuICAgICAgICAgICAgICAgICBsZXQgYXJyaGFzZW1haWwgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICBzZWxmLmJjY0Fyci5mb3JFYWNoKChpdGVtKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG5ld2VtYWlsLmVtYWlsPT1pdGVtLmVtYWlsKXtcclxuICAgICAgICAgICAgICAgICAgICAgIGFycmhhc2VtYWlsID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgaWYoYXJyaGFzZW1haWwpe1xyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5bey57uP5a2Y5Zyo55So5oi3JyxcclxuICAgICAgICAgICAgICAgICAgICAgIGltYWdlOicuLi9hc3NldHMvd19jaGEucG5nJyxcclxuICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmJjY1VzZXJJbnB1dCA9IG51bGxcclxuICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5iY2NBcnIucHVzaChuZXdlbWFpbClcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgbGV0IHVtdWJhbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTppbnB1dHZhbHVlLnN1YnN0cigwLGlucHV0dmFsdWUubGVuZ3RoLTEpLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOmlucHV0dmFsdWUuc3Vic3RyKDAsaW5wdXR2YWx1ZS5sZW5ndGgtMSksXHJcbiAgICAgICAgICAgICAgICAgICAgc2pDaGVjazpmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjY0NoZWNrOmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGJjY0NoZWNrOmZhbHNlXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgbGV0IGhhc2FycmVtYWlsID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgc2VsZi5iY2NBcnIuZm9yRWFjaCgoaXRlbSk9PntcclxuICAgICAgICAgICAgICAgICAgICBpZih1bXViYW4uZW1haWw9PWl0ZW0uZW1haWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgaGFzYXJyZW1haWwgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICBpZihoYXNhcnJlbWFpbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICflt7Lnu4/lrZjlnKjnlKjmiLcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgaW1hZ2U6Jy4uL2Fzc2V0cy93X2NoYS5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYmNjVXNlcklucHV0ID0gbnVsbFxyXG4gICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmJjY0Fyci5wdXNoKHVtdWJhbilcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmJjY1VzZXJJbnB1dCA9IG51bGxcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHB1dGVtYWlsID0gaW5wdXR2YWx1ZS5zdWJzdHIoMCxpbnB1dHZhbHVlLmxlbmd0aC0xKVxyXG4gICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXmraPnoa7pgq7nrrHlnLDlnYAnLFxyXG4gICAgICAgICAgICAgIGltYWdlOicuLi9hc3NldHMvd19jaGEucG5nJyxcclxuICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBpZihrZXk9PSdzaicpe1xyXG4gICAgICAgICAgICAgIHNlbGYuc2pVc2VySW5wdXQgPSBwdXRlbWFpbFxyXG4gICAgICAgICAgICB9ZWxzZSBpZihrZXk9PSdjYycpe1xyXG4gICAgICAgICAgICAgIHNlbGYuY2NVc2VySW5wdXQgPSBwdXRlbWFpbFxyXG4gICAgICAgICAgICB9ZWxzZSBpZihrZXk9PSdiY2MnKXtcclxuICAgICAgICAgICAgICBzZWxmLmJjY1VzZXJJbnB1dCA9IHB1dGVtYWlsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgfSxcclxuICAgICAgY2FuY2VsQ2hlY2soa2V5KXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICBpZihrZXk9PSdzaicpe1xyXG4gICAgICAgICAgc2VsZi5oYXNTalVzZXJjaGVjayA9IGZhbHNlXHJcbiAgICAgICAgICBzZWxmLnNqQXJyLmZvckVhY2goKGl0ZW0pPT57XHJcbiAgICAgICAgICAgIGl0ZW0uc2pDaGVjayA9IGZhbHNlXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1lbHNlIGlmKGtleT09J2NjJyl7XHJcbiAgICAgICAgICBzZWxmLmhhc0NjVXNlcmNoZWNrID0gZmFsc2VcclxuICAgICAgICAgIHNlbGYuY2NBcnIuZm9yRWFjaCgoaXRlbSk9PntcclxuICAgICAgICAgICAgaXRlbS5jY0NoZWNrID0gZmFsc2VcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfWVsc2UgaWYoa2V5PT0nYmNjJyl7XHJcbiAgICAgICAgICBzZWxmLmhhc0JjY1VzZXJjaGVjayA9IGZhbHNlXHJcbiAgICAgICAgICBzZWxmLmJjY0Fyci5mb3JFYWNoKChpdGVtKT0+e1xyXG4gICAgICAgICAgICBpdGVtLmJjY0NoZWNrID0gZmFsc2VcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBkZWxjdShlbWFpbCxrZXkpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIGlmKGtleT09J3NqJyl7XHJcbiAgICAgICAgICBzZWxmLnNqQXJyLmZvckVhY2goKGl0ZW0saW5kZXgpPT57XHJcbiAgICAgICAgICAgIGlmKGVtYWlsPT1pdGVtLmVtYWlsKXtcclxuICAgICAgICAgICAgICBpdGVtLnNqQ2hlY2sgPSBmYWxzZVxyXG4gICAgICAgICAgICAgIHNlbGYuc2pBcnIuc3BsaWNlKGluZGV4LDEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICBzZWxmLmhhc1NqVXNlcmNoZWNrID0gZmFsc2VcclxuICAgICAgICB9ZWxzZSBpZihrZXk9PSdjYycpe1xyXG4gICAgICAgICAgc2VsZi5jY0Fyci5mb3JFYWNoKChpdGVtLGluZGV4KT0+e1xyXG4gICAgICAgICAgICBpZihlbWFpbD09aXRlbS5lbWFpbCl7XHJcbiAgICAgICAgICAgICAgaXRlbS5jY0NoZWNrID0gZmFsc2VcclxuICAgICAgICAgICAgICBzZWxmLmNjQXJyLnNwbGljZShpbmRleCwxKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgc2VsZi5oYXNDY1VzZXJjaGVjayA9IGZhbHNlXHJcbiAgICAgICAgfWVsc2UgaWYoa2V5PT0nYmNjJyl7XHJcbiAgICAgICAgICBzZWxmLmJjY0Fyci5mb3JFYWNoKChpdGVtLGluZGV4KT0+e1xyXG4gICAgICAgICAgICBpZihlbWFpbD09aXRlbS5lbWFpbCl7XHJcbiAgICAgICAgICAgICAgaXRlbS5iY2NDaGVjayA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgc2VsZi5iY2NBcnIuc3BsaWNlKGluZGV4LDEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICBzZWxmLmhhc0JjY1VzZXJjaGVjayA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBjaGFuZ2VTdWJqZWN0KGUpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcyBcclxuICAgICAgICBzZWxmLnN1YmplY3QgID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgfSxcclxuICAgICAgY2hhbmdlVGV4dGFyZWEoZSl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgc2VsZi50ZXh0VGhlbWUgID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hvdygpIHtcclxuICAgICB2YXIgc2VsZiA9IHRoaXNcclxuICAgICBzZWxmLnNqQXJyID0gW107XHJcbiAgICAgc2VsZi50ZXh0VGhlbWUgPSAnJztcclxuICAgICBzZWxmLmdldHRleHRUaGVtZSA9ICcnO1xyXG4gICAgIHNlbGYuc3ViamVjdCA9ICcnO1xyXG4gICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly9keXdzd2ViLmNvbS9nZXR1c2VybGlzdCcsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgIHZhciBhcnIgPSBbXTtcclxuICAgICAgICAgIHZhciBmYXJyID0gW10uY29uY2F0KHJlcy5kYXRhLnBlcnNvbnMuZmllbGRzKTtcclxuICAgICAgICAgIHZhciBhbGxtdWJhbj17XHJcbiAgICAgICAgICAgIG5hbWU6J+aJgOacieaIkOWRmCcsXHJcbiAgICAgICAgICAgIGNoZWNrOnRydWUsXHJcbiAgICAgICAgICAgIHVzZXI6W11cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGZhcnIuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcclxuICAgICAgICAgICAgdmFyIGFsbHVzZXJtdWJhbj17XHJcbiAgICAgICAgICAgICAgdXNlcm5hbWU6aXRlbVswXSxcclxuICAgICAgICAgICAgICBlbWFpbDppdGVtWzFdLFxyXG4gICAgICAgICAgICAgIHNqQ2hlY2s6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgY2NDaGVjazpmYWxzZSxcclxuICAgICAgICAgICAgICBiY2NDaGVjazpmYWxzZSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgYWxsbXViYW4udXNlci5wdXNoKGFsbHVzZXJtdWJhbilcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICB2YXIgYWxscyA9IHtcclxuICAgICAgICAgICAgICB1c2VybmFtZTon6K+36YCJ5oupJyxcclxuICAgICAgICAgICAgICBlbWFpbDon6K+36YCJ5oupJyxcclxuICAgICAgICAgICAgICBzakNoZWNrOmZhbHNlLFxyXG4gICAgICAgICAgICAgIGNjQ2hlY2s6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgYmNjQ2hlY2s6ZmFsc2UsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIGFsbG11YmFuLnVzZXIudW5zaGlmdChhbGxzKVxyXG4gICAgICAgICAgc2VsZi5Vc2VyTGlzdCA9IGFsbG11YmFuXHJcbiAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgfVxyXG4gICAgIH0pXHJcbiAgICAgdmFyIG9wdGlvbnMgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdvcHRpb25zJylcclxuICAgICBpZihvcHRpb25zIT09Jycpe1xyXG4gICAgICBvcHRpb25zID0gSlNPTi5wYXJzZSh3ZXB5LmdldFN0b3JhZ2VTeW5jKCdvcHRpb25zJykpXHJcbiAgICAgIGlmKG9wdGlvbnMub3ByPT0nJyl7XHJcbiAgICAgICAgc2VsZi5zakFyciA9IG9wdGlvbnMucGVvcGxlXHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIHNlbGYuc2pBcnIgPSBvcHRpb25zLnBlb3BsZVxyXG4gICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYob3B0aW9ucy5vcHI9PVwicmVwbHlfYWxsXCIpe1xyXG4gICAgICAgICAgbGV0IG15ZGF0YSA9IHtcclxuICAgICAgICAgICAgZm9sZGVyX2lkOm9wdGlvbnMuZm9sZGVyX2lkLFxyXG4gICAgICAgICAgICBtc2dfaWQ6b3B0aW9ucy5tc2dfaWQsXHJcbiAgICAgICAgICAgIG9wcjpvcHRpb25zLm9wclxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZHl3c3dlYi5jb20vaW5pdG1haWwnLFxyXG4gICAgICAgICAgICBkYXRhOiBteWRhdGEsXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgIHNlbGYuc3ViamVjdCA9IFwi5Zue5aSNOlwiK3Jlcy5kYXRhLnN1YmplY3RcclxuICAgICAgICAgICAgICBsZXQgaW5mb2hlYWQgPSBcIi0tLeWOn+Wni+mCruS7ti0tLSBcXG5cIlxyXG4gICAgICAgICAgICAgIGxldCBzZW5kdG9yID0gXCLlj5Hku7bkuro6XCIrXCJcXFwiXCIrcmVzLmRhdGEuZnJvbStcIlxcXCJcIitcIjxcIityZXMuZGF0YS5mcm9tK1wiPlxcblwiXHJcbiAgICAgICAgICAgICAgbGV0IHN0aW1lID0gcmVzLmRhdGEuc2NoZWR1bGVcclxuICAgICAgICAgICAgICBsZXQgc2VuZHRpbWUgPSBcIuWPkemAgeaXtumXtDpcIitzdGltZSsnXFxuJ1xyXG4gICAgICAgICAgICAgIGxldCByZWNpcGllbnRzID0gXCLmlLbku7bkuro6XCI7XHJcbiAgICAgICAgICAgICAgcmVzLmRhdGEudG8uZm9yRWFjaCgoaXRlbSk9PntcclxuICAgICAgICAgICAgICAgIHJlY2lwaWVudHMgKz0gXCJcXFwiXCIraXRlbS5uYW1lK1wiXFxcIlwiK1wiPFwiK2l0ZW0uZW1haWwrXCI+XCIrXCI7XCJcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIHJlY2lwaWVudHMgKz0gJ1xcbidcclxuICAgICAgICAgICAgICBsZXQgc3ViamVjdCA9IFwi5Li76aKYOlwiK3Jlcy5kYXRhLnN1YmplY3QrJ1xcbicrJ1xcbidcclxuICAgICAgICAgICAgICBsZXQgdGV4dCA9IHJlcy5kYXRhLnRleHQuYm9keTtcclxuICAgICAgICAgICAgICBsZXQgc3RyID0gJ1xcbiBcXG4gXFxuIFxcbiBcXG4nK2luZm9oZWFkK3NlbmR0b3Irc2VuZHRpbWUrcmVjaXBpZW50cytzdWJqZWN0K3RleHRcclxuICAgICAgICAgICAgICBzZWxmLmdldHRleHRUaGVtZSA9IHN0clxyXG4gICAgICAgICAgICAgIHNlbGYuY29tcG9zZUlkID0gcmVzLmRhdGEuY29tcG9zZV9pZFxyXG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgbGV0IG15ZGF0YSA9IHtcclxuICAgICAgICAgICAgZm9sZGVyX2lkOm9wdGlvbnMuZm9sZGVyX2lkLFxyXG4gICAgICAgICAgICBtc2dfaWQ6b3B0aW9ucy5tc2dfaWQsXHJcbiAgICAgICAgICAgIG9wcjpvcHRpb25zLm9wclxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9keXdzd2ViLmNvbS9pbml0bWFpbCcsXHJcbiAgICAgICAgICAgIGRhdGE6IG15ZGF0YSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgc2VsZi5zdWJqZWN0ID0gXCLovazlj5E6XCIrcmVzLmRhdGEuc3ViamVjdFxyXG4gICAgICAgICAgICAgIGxldCBpbmZvaGVhZCA9IFwiLS0t5Y6f5aeL6YKu5Lu2LS0tIFxcblwiXHJcbiAgICAgICAgICAgICAgbGV0IHNlbmR0b3IgPSBcIuWPkeS7tuS6ujpcIitcIlxcXCJcIityZXMuZGF0YS5mcm9tK1wiXFxcIlwiK1wiPFwiK3Jlcy5kYXRhLmZyb20rXCI+XFxuXCJcclxuICAgICAgICAgICAgICBsZXQgc3RpbWUgPSByZXMuZGF0YS5zY2hlZHVsZVxyXG4gICAgICAgICAgICAgIGxldCBzZW5kdGltZSA9IFwi5Y+R6YCB5pe26Ze0OlwiK3N0aW1lKydcXG4nXHJcbiAgICAgICAgICAgICAgbGV0IHJlY2lwaWVudHMgPSBcIuaUtuS7tuS6ujpcIjtcclxuICAgICAgICAgICAgICByZXMuZGF0YS50by5mb3JFYWNoKChpdGVtKT0+e1xyXG4gICAgICAgICAgICAgICAgcmVjaXBpZW50cyArPSBcIlxcXCJcIitpdGVtLm5hbWUrXCJcXFwiXCIrXCI8XCIraXRlbS5lbWFpbCtcIj5cIitcIjtcIlxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgcmVjaXBpZW50cyArPSAnXFxuJ1xyXG4gICAgICAgICAgICAgIGxldCBzdWJqZWN0ID0gXCLkuLvpopg6XCIrcmVzLmRhdGEuc3ViamVjdCsnXFxuJysnXFxuJ1xyXG4gICAgICAgICAgICAgIGxldCB0ZXh0ID0gcmVzLmRhdGEudGV4dC5ib2R5O1xyXG4gICAgICAgICAgICAgIGxldCBzdHIgPSAnXFxuIFxcbiBcXG4gXFxuIFxcbicraW5mb2hlYWQrc2VuZHRvcitzZW5kdGltZStyZWNpcGllbnRzK3N1YmplY3QrdGV4dFxyXG4gICAgICAgICAgICAgIHNlbGYuZ2V0dGV4dFRoZW1lID0gc3RyXHJcbiAgICAgICAgICAgICAgc2VsZi5jb21wb3NlSWQgPSByZXMuZGF0YS5jb21wb3NlX2lkXHJcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgIH1lbHNle1xyXG4gICAgICBvcHRpb25zID0ge1xyXG4gICAgICAgIGZvbGRlcl9pZDonJyxcclxuICAgICAgICBtc2dfaWQ6JycsXHJcbiAgICAgICAgb3ByOicnXHJcbiAgICAgIH1cclxuICAgICAgbGV0IG15ZGF0YSA9IHtcclxuICAgICAgICBmb2xkZXJfaWQ6b3B0aW9ucy5mb2xkZXJfaWQsXHJcbiAgICAgICAgbXNnX2lkOm9wdGlvbnMubXNnX2lkLFxyXG4gICAgICAgIG9wcjpvcHRpb25zLm9wclxyXG4gICAgICB9XHJcbiAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZHl3c3dlYi5jb20vaW5pdG1haWwnLFxyXG4gICAgICAgICAgICBkYXRhOiBteWRhdGEsXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgIHNlbGYuY29tcG9zZUlkID0gcmVzLmRhdGEuY29tcG9zZV9pZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgIH1cclxuICAgICBcclxuICAgIH1cclxuICB9XHJcbiJdfQ==