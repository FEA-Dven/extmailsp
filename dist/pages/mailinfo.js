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

var WxParse = require('./../wxParse/wxParse.js');

var mailinfo = function (_wepy$page) {
  _inherits(mailinfo, _wepy$page);

  function mailinfo() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, mailinfo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = mailinfo.__proto__ || Object.getPrototypeOf(mailinfo)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: 'ExtMail'
    }, _this.components = {}, _this.data = {
      isShowDetail: false,
      MailInfo: '',
      innerHTML: '',
      char_lt: "<",
      char_gt: ">",
      action: [{ id: 0, name: '回复' }, { id: 1, name: '转发' }, { id: 2, name: '删除' }, { id: 3, name: '标为未读' }],
      folders: '',
      folderid: '',
      msgid: ''
    }, _this.computed = {}, _this.methods = {
      wxParseImgLoad: function wxParseImgLoad() {
        console.log('hello vue');
      },
      back: function back() {
        _wepy2.default.navigateBack({
          delta: 1
        });
      },
      relayMail: function relayMail() {
        var self = this;
        var option = {
          people: [{
            username: self.MailInfo.msg.from.name,
            email: self.MailInfo.msg.from.email,
            sjCheck: false,
            ccCheck: false,
            bccCheck: false
          }],
          opr: 'reply_all',
          folder_id: self.folderid,
          msg_id: self.msgid
        };
        var options = JSON.stringify(option);
        _wepy2.default.setStorageSync('options', options);
        _wepy2.default.switchTab({
          url: '/pages/write'
        });
      },
      showDetail: function showDetail() {
        this.isShowDetail = !this.isShowDetail;
      },
      selaction: function selaction(e) {
        var self = this;
        var sy = e.detail.value;
        if (sy == 0) {
          var option = {
            people: [{
              username: self.MailInfo.msg.from.name,
              email: self.MailInfo.msg.from.email,
              sjCheck: false,
              ccCheck: false,
              bccCheck: false
            }],
            opr: 'reply_all',
            folder_id: self.folderid,
            msg_id: self.msgid
          };
          var options = JSON.stringify(option);
          _wepy2.default.setStorageSync('options', options);
          _wepy2.default.switchTab({
            url: '/pages/write'
          });
        } else if (sy == 1) {
          var _option = {
            people: [{
              username: self.MailInfo.msg.from.name,
              email: self.MailInfo.msg.from.email,
              sjCheck: false,
              ccCheck: false,
              bccCheck: false
            }],
            opr: 'forward_attach',
            folder_id: self.folderid,
            msg_id: self.msgid
          };
          var _options = JSON.stringify(_option);
          _wepy2.default.setStorageSync('options', _options);
          _wepy2.default.switchTab({
            url: '/pages/write'
          });
        } else if (sy == 2) {
          var mydata = {
            msg: {
              folder_id: self.folderid,
              msg_id: self.msgid
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
                  title: '删除成功',
                  duration: 1000
                });
              }
            }
          });
        } else {
          var _mydata = {
            msg: {
              folder_id: self.folderid,
              msg_id: self.msgid
            },
            read: false
          };
          _wepy2.default.request({
            url: 'https://dywsweb.com/set_read',
            data: _mydata,
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function success(res) {
              if (res.data == 'success') {
                _wepy2.default.showToast({
                  title: '设置未读成功',
                  duration: 1000
                });
              }
            }
          });
        }
      },
      moveMail: function moveMail(e) {
        var self = this;
        var sy = e.detail.value;
        var ftd = self.folders[sy].id;
        var mvdata = {
          folder_id_target: ftd,
          msg: {
            folder_id: self.folderid,
            msg_id: self.msgid
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
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(mailinfo, [{
    key: 'onLoad',
    value: function onLoad(options) {
      var self = this;
      var folderid = options.folderid;
      self.folderid = folderid;
      var msgid = options.msgid;
      self.msgid = msgid;
      var mydata = {
        folderid: folderid,
        msgid: msgid
      };
      _wepy2.default.showLoading({
        title: '加载中'
      });
      _wepy2.default.request({
        url: 'https://dywsweb.com/getmailinfo',
        data: mydata,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function success(res) {
          self.MailInfo = res.data;
          var article = res.data.html.body;
          WxParse.wxParse('article', 'html', article, self, 0);
          self.$apply();
          _wepy2.default.hideLoading();
        }
      });
      _wepy2.default.request({
        url: 'https://dywsweb.com/getfolders',
        data: {},
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        success: function success(res) {
          self.folders = res.data;
          self.$apply();
        }
      });
    }
  }]);

  return mailinfo;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(mailinfo , 'pages/mailinfo'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haWxpbmZvLmpzIl0sIm5hbWVzIjpbIld4UGFyc2UiLCJyZXF1aXJlIiwibWFpbGluZm8iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsImRhdGEiLCJpc1Nob3dEZXRhaWwiLCJNYWlsSW5mbyIsImlubmVySFRNTCIsImNoYXJfbHQiLCJjaGFyX2d0IiwiYWN0aW9uIiwiaWQiLCJuYW1lIiwiZm9sZGVycyIsImZvbGRlcmlkIiwibXNnaWQiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJ3eFBhcnNlSW1nTG9hZCIsImNvbnNvbGUiLCJsb2ciLCJiYWNrIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJyZWxheU1haWwiLCJzZWxmIiwib3B0aW9uIiwicGVvcGxlIiwidXNlcm5hbWUiLCJtc2ciLCJmcm9tIiwiZW1haWwiLCJzakNoZWNrIiwiY2NDaGVjayIsImJjY0NoZWNrIiwib3ByIiwiZm9sZGVyX2lkIiwibXNnX2lkIiwib3B0aW9ucyIsIkpTT04iLCJzdHJpbmdpZnkiLCJzZXRTdG9yYWdlU3luYyIsInN3aXRjaFRhYiIsInVybCIsInNob3dEZXRhaWwiLCJzZWxhY3Rpb24iLCJlIiwic3kiLCJkZXRhaWwiLCJ2YWx1ZSIsIm15ZGF0YSIsInJlcXVlc3QiLCJoZWFkZXIiLCJtZXRob2QiLCJzdWNjZXNzIiwicmVzIiwic2hvd1RvYXN0IiwidGl0bGUiLCJkdXJhdGlvbiIsInJlYWQiLCJtb3ZlTWFpbCIsImZ0ZCIsIm12ZGF0YSIsImZvbGRlcl9pZF90YXJnZXQiLCJzaG93TG9hZGluZyIsImFydGljbGUiLCJodG1sIiwiYm9keSIsInd4UGFyc2UiLCIkYXBwbHkiLCJoaWRlTG9hZGluZyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7QUFDQSxJQUFJQSxVQUFVQyxRQUFRLHVCQUFSLENBQWQ7O0lBQ3FCQyxROzs7Ozs7Ozs7Ozs7OzswTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFB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QVNBLFFBREU7QUFFWEMsZUFBTUE7QUFGSyxPQUFiO0FBSUEscUJBQUtpRCxXQUFMLENBQWlCO0FBQ2RQLGVBQU87QUFETyxPQUFqQjtBQUdBLHFCQUFLTixPQUFMLENBQWE7QUFDUlIsYUFBSyxpQ0FERztBQUVSdkMsY0FBTThDLE1BRkU7QUFHUEUsZ0JBQVE7QUFDTiwwQkFBZ0I7QUFEVixTQUhEO0FBTVJDLGdCQUFRLE1BTkE7QUFPUkMsaUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN2QjlCLGVBQUtuQixRQUFMLEdBQWdCaUQsSUFBSW5ELElBQXBCO0FBQ0EsY0FBSTZELFVBQVVWLElBQUluRCxJQUFKLENBQVM4RCxJQUFULENBQWNDLElBQTVCO0FBQ0FyRSxrQkFBUXNFLE9BQVIsQ0FBZ0IsU0FBaEIsRUFBMkIsTUFBM0IsRUFBbUNILE9BQW5DLEVBQTRDeEMsSUFBNUMsRUFBa0QsQ0FBbEQ7QUFDQUEsZUFBSzRDLE1BQUw7QUFDQSx5QkFBS0MsV0FBTDtBQUNBO0FBYk8sT0FBYjtBQWVBLHFCQUFLbkIsT0FBTCxDQUFhO0FBQ1JSLGFBQUssZ0NBREc7QUFFUnZDLGNBQU0sRUFGRTtBQUlSZ0QsZ0JBQVE7QUFDTiwwQkFBZ0I7QUFEVixTQUpBO0FBT1JDLGdCQUFRLE1BUEE7QUFRUkMsaUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN2QjlCLGVBQUtaLE9BQUwsR0FBZTBDLElBQUluRCxJQUFuQjtBQUNBcUIsZUFBSzRDLE1BQUw7QUFDQTtBQVhPLE9BQWI7QUFhSDs7OztFQTdOcUMsZUFBS0UsSTs7a0JBQXRCdkUsUSIsImZpbGUiOiJtYWlsaW5mby5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgdmFyIFd4UGFyc2UgPSByZXF1aXJlKCcuLi93eFBhcnNlL3d4UGFyc2UuanMnKTtcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBtYWlsaW5mbyBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdFeHRNYWlsJ1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50cyA9IHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICBpc1Nob3dEZXRhaWw6ZmFsc2UsXHJcbiAgICAgTWFpbEluZm86JycsXHJcbiAgICAgaW5uZXJIVE1MOicnLFxyXG4gICAgIGNoYXJfbHQ6XCI8XCIsXHJcbiAgICAgY2hhcl9ndDpcIj5cIixcclxuICAgICBhY3Rpb246W3tpZDowLG5hbWU6J+WbnuWkjSd9LHtpZDoxLG5hbWU6J+i9rOWPkSd9LHtpZDoyLG5hbWU6J+WIoOmZpCd9LHtpZDozLG5hbWU6J+agh+S4uuacquivuyd9XSxcclxuICAgICBmb2xkZXJzOicnLFxyXG4gICAgIGZvbGRlcmlkOicnLFxyXG4gICAgIG1zZ2lkOicnXHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIHd4UGFyc2VJbWdMb2FkICgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdoZWxsbyB2dWUnKVxyXG4gICAgICB9LFxyXG4gICAgICBiYWNrKCl7XHJcbiAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe1xyXG4gICAgICAgICAgZGVsdGE6IDFcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG4gICAgICByZWxheU1haWwoKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICBsZXQgb3B0aW9uID0ge1xyXG4gICAgICAgICAgICBwZW9wbGU6W1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHVzZXJuYW1lOnNlbGYuTWFpbEluZm8ubXNnLmZyb20ubmFtZSxcclxuICAgICAgICAgICAgICAgIGVtYWlsOnNlbGYuTWFpbEluZm8ubXNnLmZyb20uZW1haWwsXHJcbiAgICAgICAgICAgICAgICBzakNoZWNrOmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2NDaGVjazpmYWxzZSxcclxuICAgICAgICAgICAgICAgIGJjY0NoZWNrOmZhbHNlLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIG9wcjoncmVwbHlfYWxsJyxcclxuICAgICAgICAgICAgZm9sZGVyX2lkOnNlbGYuZm9sZGVyaWQsXHJcbiAgICAgICAgICAgIG1zZ19pZDpzZWxmLm1zZ2lkXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBsZXQgb3B0aW9ucyA9IEpTT04uc3RyaW5naWZ5KG9wdGlvbilcclxuICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ29wdGlvbnMnLG9wdGlvbnMpXHJcbiAgICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XHJcbiAgICAgICAgICAgIHVybDogJy9wYWdlcy93cml0ZSdcclxuICAgICAgICAgIH0pXHJcbiAgICAgIH0sXHJcbiAgICAgIHNob3dEZXRhaWwoKXtcclxuICAgICAgICB0aGlzLmlzU2hvd0RldGFpbCA9ICF0aGlzLmlzU2hvd0RldGFpbFxyXG4gICAgICB9LFxyXG4gICAgICBzZWxhY3Rpb24oZSl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgbGV0IHN5ID0gZS5kZXRhaWwudmFsdWUgXHJcbiAgICAgICAgaWYoc3k9PTApe1xyXG4gICAgICAgICAgbGV0IG9wdGlvbiA9IHtcclxuICAgICAgICAgICAgcGVvcGxlOltcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB1c2VybmFtZTpzZWxmLk1haWxJbmZvLm1zZy5mcm9tLm5hbWUsXHJcbiAgICAgICAgICAgICAgICBlbWFpbDpzZWxmLk1haWxJbmZvLm1zZy5mcm9tLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgc2pDaGVjazpmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNjQ2hlY2s6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBiY2NDaGVjazpmYWxzZSxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBvcHI6J3JlcGx5X2FsbCcsXHJcbiAgICAgICAgICAgIGZvbGRlcl9pZDpzZWxmLmZvbGRlcmlkLFxyXG4gICAgICAgICAgICBtc2dfaWQ6c2VsZi5tc2dpZFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgbGV0IG9wdGlvbnMgPSBKU09OLnN0cmluZ2lmeShvcHRpb24pXHJcbiAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdvcHRpb25zJyxvcHRpb25zKVxyXG4gICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xyXG4gICAgICAgICAgICB1cmw6ICcvcGFnZXMvd3JpdGUnXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1lbHNlIGlmKHN5PT0xKXtcclxuICAgICAgICAgICBsZXQgb3B0aW9uID0ge1xyXG4gICAgICAgICAgICBwZW9wbGU6W1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHVzZXJuYW1lOnNlbGYuTWFpbEluZm8ubXNnLmZyb20ubmFtZSxcclxuICAgICAgICAgICAgICAgIGVtYWlsOnNlbGYuTWFpbEluZm8ubXNnLmZyb20uZW1haWwsXHJcbiAgICAgICAgICAgICAgICBzakNoZWNrOmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2NDaGVjazpmYWxzZSxcclxuICAgICAgICAgICAgICAgIGJjY0NoZWNrOmZhbHNlLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIG9wcjonZm9yd2FyZF9hdHRhY2gnLFxyXG4gICAgICAgICAgICBmb2xkZXJfaWQ6c2VsZi5mb2xkZXJpZCxcclxuICAgICAgICAgICAgbXNnX2lkOnNlbGYubXNnaWRcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGxldCBvcHRpb25zID0gSlNPTi5zdHJpbmdpZnkob3B0aW9uKVxyXG4gICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygnb3B0aW9ucycsb3B0aW9ucylcclxuICAgICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcclxuICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL3dyaXRlJ1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9ZWxzZSBpZihzeT09Mil7XHJcbiAgICAgICAgICBsZXQgbXlkYXRhID0ge1xyXG4gICAgICAgICAgICBtc2c6e1xyXG4gICAgICAgICAgICAgICAgIGZvbGRlcl9pZDpzZWxmLmZvbGRlcmlkLFxyXG4gICAgICAgICAgICAgICAgIG1zZ19pZDpzZWxmLm1zZ2lkLFxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZHl3c3dlYi5jb20vbXNnX2RlbGV0ZV9hY3R1YWwnLFxyXG4gICAgICAgICAgICAgIGRhdGE6IG15ZGF0YSxcclxuICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICBpZihyZXMuZGF0YT09J3N1Y2Nlc3MnKXtcclxuICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6ICfliKDpmaTmiJDlip8nLFxyXG4gICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICBsZXQgbXlkYXRhID0ge1xyXG4gICAgICAgICAgICBtc2c6e1xyXG4gICAgICAgICAgICAgICAgIGZvbGRlcl9pZDpzZWxmLmZvbGRlcmlkLFxyXG4gICAgICAgICAgICAgICAgIG1zZ19pZDpzZWxmLm1zZ2lkLFxyXG4gICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZWFkOmZhbHNlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZHl3c3dlYi5jb20vc2V0X3JlYWQnLFxyXG4gICAgICAgICAgICAgIGRhdGE6IG15ZGF0YSxcclxuICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICBpZihyZXMuZGF0YT09J3N1Y2Nlc3MnKXtcclxuICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6ICforr7nva7mnKror7vmiJDlip8nLFxyXG4gICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBtb3ZlTWFpbChlKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICBsZXQgc3kgPSBlLmRldGFpbC52YWx1ZSBcclxuICAgICAgICBsZXQgZnRkID0gc2VsZi5mb2xkZXJzW3N5XS5pZCBcclxuICAgICAgICBsZXQgbXZkYXRhID0ge1xyXG4gICAgICAgICAgZm9sZGVyX2lkX3RhcmdldDpmdGQsXHJcbiAgICAgICAgICAgIG1zZzp7XHJcbiAgICAgICAgICAgICAgZm9sZGVyX2lkOnNlbGYuZm9sZGVyaWQsXHJcbiAgICAgICAgICAgICAgbXNnX2lkOnNlbGYubXNnaWQsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICAgXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICB1cmw6ICdodHRwczovL2R5d3N3ZWIuY29tL21zZ19tb3ZlJyxcclxuICAgICAgICAgICBkYXRhOiBtdmRhdGEsXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgIGlmKHJlcy5kYXRhPT0nc3VjY2Vzcycpe1xyXG4gICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogJ+aTjeS9nOaIkOWKnycsXHJcbiAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICBsZXQgZm9sZGVyaWQgPSBvcHRpb25zLmZvbGRlcmlkO1xyXG4gICAgICBzZWxmLmZvbGRlcmlkID0gZm9sZGVyaWRcclxuICAgICAgbGV0IG1zZ2lkID0gb3B0aW9ucy5tc2dpZDtcclxuICAgICAgc2VsZi5tc2dpZCA9ICBtc2dpZFxyXG4gICAgICBsZXQgbXlkYXRhID0ge1xyXG4gICAgICAgIGZvbGRlcmlkOmZvbGRlcmlkLFxyXG4gICAgICAgIG1zZ2lkOm1zZ2lkLFxyXG4gICAgICB9XHJcbiAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgICB9KVxyXG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgIHVybDogJ2h0dHBzOi8vZHl3c3dlYi5jb20vZ2V0bWFpbGluZm8nLFxyXG4gICAgICAgICAgIGRhdGE6IG15ZGF0YSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICBzZWxmLk1haWxJbmZvID0gcmVzLmRhdGEgXHJcbiAgICAgICAgICAgIGxldCBhcnRpY2xlID0gcmVzLmRhdGEuaHRtbC5ib2R5XHJcbiAgICAgICAgICAgIFd4UGFyc2Uud3hQYXJzZSgnYXJ0aWNsZScsICdodG1sJywgYXJ0aWNsZSwgc2VsZiwgMCk7XHJcbiAgICAgICAgICAgIHNlbGYuJGFwcGx5KCkgXHJcbiAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcbiAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9keXdzd2ViLmNvbS9nZXRmb2xkZXJzJyxcclxuICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgfSxcclxuICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICB9LFxyXG4gICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgc2VsZi5mb2xkZXJzID0gcmVzLmRhdGFcclxuICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==