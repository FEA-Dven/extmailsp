<view class="writehead">
      <button class="defaultbtn" bindtap="back">返回</button>
      <button class="defaultbtn savebtn" bindtap="saveMail">保存</button>
      <button class="defaultbtn sendbtn" bindtap="sendMail">发送</button>
    </view>
    <view class="theme">
      <view class="themeItem sj">
        <view class="themeItemleft">
          收件人:
        </view>
        <view class="themeItemmid" bindtap="changeSjFocus">
          <view wx:key="{{index}}" wx:for="(item,index) in sjArr">
            <view class="mailname" class="{'itemCheck':item.sjCheck}"  bindtap="userMethods(index,'sj')">{{item.username}}</view>
          </view>
          <input type="text" class="putUserInput" v-focus="sjFocus" v-model="sjUserInput" bindinput="putsjArr">
        </view>
        <view class="themeItemright">
          <image src="../assets/b_add.png" class="adduserbtn" alt="" bindtap="changeSjImg">
        </view>
      </view>
      <view class="themeItem sj" v-if="hasSjUsercheck">
        <view class="usercheck">
          <view class="checkUsername">{{sjcuname}}</view>
          <view class="checkEmail">{{sjcuemail}}</view>
          </view>
        <button class="writeBtn" bindtap="cancelCheck('sj')">取消</button>
        <button class="writeBtn" :data-value="sjcuemail" bindtap="delcu($event,'sj')">删除</button>
      </view>

      <view class="cellcontainer" v-if="sjImg">
          <view wx:key="{{index}}" wx:for="(item,index) in List[0].user">
            <view class="sub-item" bindtap="sjarradd(index)" >{{item.username+'<'+item.email+'>'}}</view>
          </view>
        </view>
      <view class="themeItem cc">
        <view class="themeItemleft">
          抄送:
        </view>
        <view class="themeItemmid" bindtap="changeCcFocus">
          <view wx:key="{{index}}" wx:for="(item,index) in ccArr">
            <view class="mailname" class="{'itemCheck':item.ccCheck}"  bindtap="userMethods(index,'cc')">{{item.username}}</view>
          </view>
          <input type="text" class="putUserInput" v-focus="ccFocus" v-model="ccUserInput" bindinput="putccArr">
        </view>
        <view class="themeItemright">
          <image src="../assets/b_add.png" class="adduserbtn" alt="" bindtap="changeCcImg">
        </view>
      </view>
      <view class="themeItem cc" v-if="hasCcUsercheck">
        <view class="usercheck">
          <view class="checkUsername">{{cccuname}}</view>
          <view class="checkEmail">{{cccuemail}}</view>
          </view>
        <button class="writeBtn" bindtap="cancelCheck('cc')">取消</button>
        <button class="writeBtn" :data-value="cccuemail" bindtap="delcu($event,'cc')">删除</button>
      </view>
        <view class="cellcontainer" v-if="ccImg">
          <view wx:key="{{index}}" wx:for="(item,index) in List[0].user">
            <view class="sub-item" bindtap="ccarradd(index)" >{{item.username+'<'+item.email+'>'}}</view>
          </view>
        </view>
      <view class="themeItem bcc">
        <view class="themeItemleft">
          密送:
        </view>
        <view class="themeItemmid" bindtap="changeBccFocus">
          <view wx:key="{{index}}" wx:for="(item,index) in bccArr">
            <view class="mailname" class="{'itemCheck':item.bccCheck}" bindtap="userMethods(index,'bcc')">{{item.username}}</view>
          </view>
          <input type="text" class="putUserInput" v-focus="bccFocus" v-model="bccUserInput" bindinput="putbccArr">
        </view>
        <view class="themeItemright">
          <image src="../assets/b_add.png" class="adduserbtn" alt="" bindtap="changeBccImg">
        </view>
      </view>
      <view class="themeItem bcc" v-if="hasBccUsercheck">
        <view class="usercheck">
          <view class="checkUsername">{{bcccuname}}</view>
          <view class="checkEmail">{{bcccuemail}}</view>
          </view>
        <button class="writeBtn" bindtap="cancelCheck('bcc')">取消</button>
        <button class="writeBtn" :data-value="bcccuemail" bindtap="delcu($event,'bcc')">删除</button>
      </view>
        <view class="cellcontainer" v-if="bccImg">
           <view wx:key="{{index}}" wx:for="(item,index) in List[0].user">
            <view class="sub-item" bindtap="bccarradd(index)" >{{item.username+'<'+item.email+'>'}}</view>
          </view>
        </view>

      <view class="themeItem">
        <view class="themeItemleft">
          主题:
        </view>
        <input type="text" class="subject" bindtap="clearFocus" v-model="subject">
      </view>
      <textarea bindtap="clearFocus" class="textTheme" v-model="textTheme" placeholder="请输入邮件内容..."></textarea>
      
    </view>