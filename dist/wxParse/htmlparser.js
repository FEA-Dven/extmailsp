"use strict";

/**
 * 
 * htmlParser改造自: https://github.com/blowsie/Pure-JavaScript-HTML5-Parser
 * 
 * author: Di (微信小程序开发工程师)
 * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
 *               垂直微信小程序开发交流社区
 * 
 * github地址: https://github.com/icindy/wxParse
 * 
 * for: 微信小程序富文本解析
 * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
 */
// Regular Expressions for parsing tags and attributes
var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
    endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
    attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

// Empty Elements - HTML 5
var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");

// Block Elements - HTML 5
var block = makeMap("a,address,code,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");

// Inline Elements - HTML 5
var inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

// Attributes that have their values filled in disabled="disabled"
var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

// Special Elements (can contain anything)
var special = makeMap("wxxxcode-style,script,style,view,scroll-view,block");

function HTMLParser(html, handler) {
	var index,
	    chars,
	    match,
	    stack = [],
	    last = html;
	stack.last = function () {
		return this[this.length - 1];
	};

	while (html) {
		chars = true;

		// Make sure we're not in a script or style element
		if (!stack.last() || !special[stack.last()]) {

			// Comment
			if (html.indexOf("<!--") == 0) {
				index = html.indexOf("-->");

				if (index >= 0) {
					if (handler.comment) handler.comment(html.substring(4, index));
					html = html.substring(index + 3);
					chars = false;
				}

				// end tag
			} else if (html.indexOf("</") == 0) {
				match = html.match(endTag);

				if (match) {
					html = html.substring(match[0].length);
					match[0].replace(endTag, parseEndTag);
					chars = false;
				}

				// start tag
			} else if (html.indexOf("<") == 0) {
				match = html.match(startTag);

				if (match) {
					html = html.substring(match[0].length);
					match[0].replace(startTag, parseStartTag);
					chars = false;
				}
			}

			if (chars) {
				index = html.indexOf("<");
				var text = '';
				while (index === 0) {
					text += "<";
					html = html.substring(1);
					index = html.indexOf("<");
				}
				text += index < 0 ? html : html.substring(0, index);
				html = index < 0 ? "" : html.substring(index);

				if (handler.chars) handler.chars(text);
			}
		} else {

			html = html.replace(new RegExp("([\\s\\S]*?)<\/" + stack.last() + "[^>]*>"), function (all, text) {
				text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
				if (handler.chars) handler.chars(text);

				return "";
			});

			parseEndTag("", stack.last());
		}

		if (html == last) throw "Parse Error: " + html;
		last = html;
	}

	// Clean up any remaining tags
	parseEndTag();

	function parseStartTag(tag, tagName, rest, unary) {
		tagName = tagName.toLowerCase();

		if (block[tagName]) {
			while (stack.last() && inline[stack.last()]) {
				parseEndTag("", stack.last());
			}
		}

		if (closeSelf[tagName] && stack.last() == tagName) {
			parseEndTag("", tagName);
		}

		unary = empty[tagName] || !!unary;

		if (!unary) stack.push(tagName);

		if (handler.start) {
			var attrs = [];

			rest.replace(attr, function (match, name) {
				var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : "";

				attrs.push({
					name: name,
					value: value,
					escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') //"
				});
			});

			if (handler.start) {
				handler.start(tagName, attrs, unary);
			}
		}
	}

	function parseEndTag(tag, tagName) {
		// If no tag name is provided, clean shop
		if (!tagName) var pos = 0;

		// Find the closest opened tag of the same type
		else {
				tagName = tagName.toLowerCase();
				for (var pos = stack.length - 1; pos >= 0; pos--) {
					if (stack[pos] == tagName) break;
				}
			}
		if (pos >= 0) {
			// Close all the open elements, up the stack
			for (var i = stack.length - 1; i >= pos; i--) {
				if (handler.end) handler.end(stack[i]);
			} // Remove the open elements from the stack
			stack.length = pos;
		}
	}
};

function makeMap(str) {
	var obj = {},
	    items = str.split(",");
	for (var i = 0; i < items.length; i++) {
		obj[items[i]] = true;
	}return obj;
}

module.exports = HTMLParser;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0bWxwYXJzZXIuanMiXSwibmFtZXMiOlsic3RhcnRUYWciLCJlbmRUYWciLCJhdHRyIiwiZW1wdHkiLCJtYWtlTWFwIiwiYmxvY2siLCJpbmxpbmUiLCJjbG9zZVNlbGYiLCJmaWxsQXR0cnMiLCJzcGVjaWFsIiwiSFRNTFBhcnNlciIsImh0bWwiLCJoYW5kbGVyIiwiaW5kZXgiLCJjaGFycyIsIm1hdGNoIiwic3RhY2siLCJsYXN0IiwibGVuZ3RoIiwiaW5kZXhPZiIsImNvbW1lbnQiLCJzdWJzdHJpbmciLCJyZXBsYWNlIiwicGFyc2VFbmRUYWciLCJwYXJzZVN0YXJ0VGFnIiwidGV4dCIsIlJlZ0V4cCIsImFsbCIsInRhZyIsInRhZ05hbWUiLCJyZXN0IiwidW5hcnkiLCJ0b0xvd2VyQ2FzZSIsInB1c2giLCJzdGFydCIsImF0dHJzIiwibmFtZSIsInZhbHVlIiwiYXJndW1lbnRzIiwiZXNjYXBlZCIsInBvcyIsImkiLCJlbmQiLCJzdHIiLCJvYmoiLCJpdGVtcyIsInNwbGl0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7Ozs7Ozs7OztBQWFBO0FBQ0EsSUFBSUEsV0FBVyxnSEFBZjtBQUFBLElBQ0NDLFNBQVMsNEJBRFY7QUFBQSxJQUVDQyxPQUFPLG9HQUZSOztBQUlBO0FBQ0EsSUFBSUMsUUFBUUMsUUFBUSxvR0FBUixDQUFaOztBQUVBO0FBQ0EsSUFBSUMsUUFBUUQsUUFBUSxvVEFBUixDQUFaOztBQUVBO0FBQ0EsSUFBSUUsU0FBU0YsUUFBUSw2TEFBUixDQUFiOztBQUVBO0FBQ0E7QUFDQSxJQUFJRyxZQUFZSCxRQUFRLGtEQUFSLENBQWhCOztBQUVBO0FBQ0EsSUFBSUksWUFBWUosUUFBUSx3R0FBUixDQUFoQjs7QUFFQTtBQUNBLElBQUlLLFVBQVVMLFFBQVEsb0RBQVIsQ0FBZDs7QUFFQSxTQUFTTSxVQUFULENBQW9CQyxJQUFwQixFQUEwQkMsT0FBMUIsRUFBbUM7QUFDbEMsS0FBSUMsS0FBSjtBQUFB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QUNBOztBQUVERyxPQUFPQyxPQUFQLEdBQWlCdEMsVUFBakIiLCJmaWxlIjoiaHRtbHBhcnNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBcclxuICogaHRtbFBhcnNlcuaUuemAoOiHqjogaHR0cHM6Ly9naXRodWIuY29tL2Jsb3dzaWUvUHVyZS1KYXZhU2NyaXB0LUhUTUw1LVBhcnNlclxyXG4gKiBcclxuICogYXV0aG9yOiBEaSAo5b6u5L+h5bCP56iL5bqP5byA5Y+R5bel56iL5biIKVxyXG4gKiBvcmdhbml6YXRpb246IFdlQXBwRGV2KOW+ruS/oeWwj+eoi+W6j+W8gOWPkeiuuuWdmykoaHR0cDovL3dlYXBwZGV2LmNvbSlcclxuICogICAgICAgICAgICAgICDlnoLnm7Tlvq7kv6HlsI/nqIvluo/lvIDlj5HkuqTmtYHnpL7ljLpcclxuICogXHJcbiAqIGdpdGh1YuWcsOWdgDogaHR0cHM6Ly9naXRodWIuY29tL2ljaW5keS93eFBhcnNlXHJcbiAqIFxyXG4gKiBmb3I6IOW+ruS/oeWwj+eoi+W6j+WvjOaWh+acrOino+aekFxyXG4gKiBkZXRhaWwgOiBodHRwOi8vd2VhcHBkZXYuY29tL3Qvd3hwYXJzZS1hbHBoYTAtMS1odG1sLW1hcmtkb3duLzE4NFxyXG4gKi9cclxuLy8gUmVndWxhciBFeHByZXNzaW9ucyBmb3IgcGFyc2luZyB0YWdzIGFuZCBhdHRyaWJ1dGVzXHJcbnZhciBzdGFydFRhZyA9IC9ePChbLUEtWmEtejAtOV9dKykoKD86XFxzK1thLXpBLVpfOl1bLWEtekEtWjAtOV86Ll0qKD86XFxzKj1cXHMqKD86KD86XCJbXlwiXSpcIil8KD86J1teJ10qJyl8W14+XFxzXSspKT8pKilcXHMqKFxcLz8pPi8sXHJcblx0ZW5kVGFnID0gL148XFwvKFstQS1aYS16MC05X10rKVtePl0qPi8sXHJcblx0YXR0ciA9IC8oW2EtekEtWl86XVstYS16QS1aMC05XzouXSopKD86XFxzKj1cXHMqKD86KD86XCIoKD86XFxcXC58W15cIl0pKilcIil8KD86JygoPzpcXFxcLnxbXiddKSopJyl8KFtePlxcc10rKSkpPy9nO1xyXG5cclxuLy8gRW1wdHkgRWxlbWVudHMgLSBIVE1MIDVcclxudmFyIGVtcHR5ID0gbWFrZU1hcChcImFyZWEsYmFzZSxiYXNlZm9udCxicixjb2wsZnJhbWUsaHIsaW1nLGlucHV0LGxpbmssbWV0YSxwYXJhbSxlbWJlZCxjb21tYW5kLGtleWdlbixzb3VyY2UsdHJhY2ssd2JyXCIpO1xyXG5cclxuLy8gQmxvY2sgRWxlbWVudHMgLSBIVE1MIDVcclxudmFyIGJsb2NrID0gbWFrZU1hcChcImEsYWRkcmVzcyxjb2RlLGFydGljbGUsYXBwbGV0LGFzaWRlLGF1ZGlvLGJsb2NrcXVvdGUsYnV0dG9uLGNhbnZhcyxjZW50ZXIsZGQsZGVsLGRpcixkaXYsZGwsZHQsZmllbGRzZXQsZmlnY2FwdGlvbixmaWd1cmUsZm9vdGVyLGZvcm0sZnJhbWVzZXQsaDEsaDIsaDMsaDQsaDUsaDYsaGVhZGVyLGhncm91cCxocixpZnJhbWUsaW5zLGlzaW5kZXgsbGksbWFwLG1lbnUsbm9mcmFtZXMsbm9zY3JpcHQsb2JqZWN0LG9sLG91dHB1dCxwLHByZSxzZWN0aW9uLHNjcmlwdCx0YWJsZSx0Ym9keSx0ZCx0Zm9vdCx0aCx0aGVhZCx0cix1bCx2aWRlb1wiKTtcclxuXHJcbi8vIElubGluZSBFbGVtZW50cyAtIEhUTUwgNVxyXG52YXIgaW5saW5lID0gbWFrZU1hcChcImFiYnIsYWNyb255bSxhcHBsZXQsYixiYXNlZm9udCxiZG8sYmlnLGJyLGJ1dHRvbixjaXRlLGRlbCxkZm4sZW0sZm9udCxpLGlmcmFtZSxpbWcsaW5wdXQsaW5zLGtiZCxsYWJlbCxtYXAsb2JqZWN0LHEscyxzYW1wLHNjcmlwdCxzZWxlY3Qsc21hbGwsc3BhbixzdHJpa2Usc3Ryb25nLHN1YixzdXAsdGV4dGFyZWEsdHQsdSx2YXJcIik7XHJcblxyXG4vLyBFbGVtZW50cyB0aGF0IHlvdSBjYW4sIGludGVudGlvbmFsbHksIGxlYXZlIG9wZW5cclxuLy8gKGFuZCB3aGljaCBjbG9zZSB0aGVtc2VsdmVzKVxyXG52YXIgY2xvc2VTZWxmID0gbWFrZU1hcChcImNvbGdyb3VwLGRkLGR0LGxpLG9wdGlvbnMscCx0ZCx0Zm9vdCx0aCx0aGVhZCx0clwiKTtcclxuXHJcbi8vIEF0dHJpYnV0ZXMgdGhhdCBoYXZlIHRoZWlyIHZhbHVlcyBmaWxsZWQgaW4gZGlzYWJsZWQ9XCJkaXNhYmxlZFwiXHJcbnZhciBmaWxsQXR0cnMgPSBtYWtlTWFwKFwiY2hlY2tlZCxjb21wYWN0LGRlY2xhcmUsZGVmZXIsZGlzYWJsZWQsaXNtYXAsbXVsdGlwbGUsbm9ocmVmLG5vcmVzaXplLG5vc2hhZGUsbm93cmFwLHJlYWRvbmx5LHNlbGVjdGVkXCIpO1xyXG5cclxuLy8gU3BlY2lhbCBFbGVtZW50cyAoY2FuIGNvbnRhaW4gYW55dGhpbmcpXHJcbnZhciBzcGVjaWFsID0gbWFrZU1hcChcInd4eHhjb2RlLXN0eWxlLHNjcmlwdCxzdHlsZSx2aWV3LHNjcm9sbC12aWV3LGJsb2NrXCIpO1xyXG5cclxuZnVuY3Rpb24gSFRNTFBhcnNlcihodG1sLCBoYW5kbGVyKSB7XHJcblx0dmFyIGluZGV4LCBjaGFycywgbWF0Y2gsIHN0YWNrID0gW10sIGxhc3QgPSBodG1sO1xyXG5cdHN0YWNrLmxhc3QgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpc1t0aGlzLmxlbmd0aCAtIDFdO1xyXG5cdH07XHJcblxyXG5cdHdoaWxlIChodG1sKSB7XHJcblx0XHRjaGFycyA9IHRydWU7XHJcblxyXG5cdFx0Ly8gTWFrZSBzdXJlIHdlJ3JlIG5vdCBpbiBhIHNjcmlwdCBvciBzdHlsZSBlbGVtZW50XHJcblx0XHRpZiAoIXN0YWNrLmxhc3QoKSB8fCAhc3BlY2lhbFtzdGFjay5sYXN0KCldKSB7XHJcblxyXG5cdFx0XHQvLyBDb21tZW50XHJcblx0XHRcdGlmIChodG1sLmluZGV4T2YoXCI8IS0tXCIpID09IDApIHtcclxuXHRcdFx0XHRpbmRleCA9IGh0bWwuaW5kZXhPZihcIi0tPlwiKTtcclxuXHJcblx0XHRcdFx0aWYgKGluZGV4ID49IDApIHtcclxuXHRcdFx0XHRcdGlmIChoYW5kbGVyLmNvbW1lbnQpXHJcblx0XHRcdFx0XHRcdGhhbmRsZXIuY29tbWVudChodG1sLnN1YnN0cmluZyg0LCBpbmRleCkpO1xyXG5cdFx0XHRcdFx0aHRtbCA9IGh0bWwuc3Vic3RyaW5nKGluZGV4ICsgMyk7XHJcblx0XHRcdFx0XHRjaGFycyA9IGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gZW5kIHRhZ1xyXG5cdFx0XHR9IGVsc2UgaWYgKGh0bWwuaW5kZXhPZihcIjwvXCIpID09IDApIHtcclxuXHRcdFx0XHRtYXRjaCA9IGh0bWwubWF0Y2goZW5kVGFnKTtcclxuXHJcblx0XHRcdFx0aWYgKG1hdGNoKSB7XHJcblx0XHRcdFx0XHRodG1sID0gaHRtbC5zdWJzdHJpbmcobWF0Y2hbMF0ubGVuZ3RoKTtcclxuXHRcdFx0XHRcdG1hdGNoWzBdLnJlcGxhY2UoZW5kVGFnLCBwYXJzZUVuZFRhZyk7XHJcblx0XHRcdFx0XHRjaGFycyA9IGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gc3RhcnQgdGFnXHJcblx0XHRcdH0gZWxzZSBpZiAoaHRtbC5pbmRleE9mKFwiPFwiKSA9PSAwKSB7XHJcblx0XHRcdFx0bWF0Y2ggPSBodG1sLm1hdGNoKHN0YXJ0VGFnKTtcclxuXHJcblx0XHRcdFx0aWYgKG1hdGNoKSB7XHJcblx0XHRcdFx0XHRodG1sID0gaHRtbC5zdWJzdHJpbmcobWF0Y2hbMF0ubGVuZ3RoKTtcclxuXHRcdFx0XHRcdG1hdGNoWzBdLnJlcGxhY2Uoc3RhcnRUYWcsIHBhcnNlU3RhcnRUYWcpO1xyXG5cdFx0XHRcdFx0Y2hhcnMgPSBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChjaGFycykge1xyXG5cdFx0XHRcdGluZGV4ID0gaHRtbC5pbmRleE9mKFwiPFwiKTtcclxuXHRcdFx0XHR2YXIgdGV4dCA9ICcnXHJcblx0XHRcdFx0d2hpbGUgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ICs9IFwiPFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCA9IGh0bWwuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBodG1sLmluZGV4T2YoXCI8XCIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0ZXh0ICs9IGluZGV4IDwgMCA/IGh0bWwgOiBodG1sLnN1YnN0cmluZygwLCBpbmRleCk7XHJcblx0XHRcdFx0aHRtbCA9IGluZGV4IDwgMCA/IFwiXCIgOiBodG1sLnN1YnN0cmluZyhpbmRleCk7XHJcblxyXG5cdFx0XHRcdGlmIChoYW5kbGVyLmNoYXJzKVxyXG5cdFx0XHRcdFx0aGFuZGxlci5jaGFycyh0ZXh0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRodG1sID0gaHRtbC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoW1xcXFxzXFxcXFNdKj8pPFxcL1wiICsgc3RhY2subGFzdCgpICsgXCJbXj5dKj5cIiksIGZ1bmN0aW9uIChhbGwsIHRleHQpIHtcclxuXHRcdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKC88IS0tKFtcXHNcXFNdKj8pLS0+fDwhXFxbQ0RBVEFcXFsoW1xcc1xcU10qPyldXT4vZywgXCIkMSQyXCIpO1xyXG5cdFx0XHRcdGlmIChoYW5kbGVyLmNoYXJzKVxyXG5cdFx0XHRcdFx0aGFuZGxlci5jaGFycyh0ZXh0KTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIFwiXCI7XHJcblx0XHRcdH0pO1xyXG5cclxuXHJcblx0XHRcdHBhcnNlRW5kVGFnKFwiXCIsIHN0YWNrLmxhc3QoKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGh0bWwgPT0gbGFzdClcclxuXHRcdFx0dGhyb3cgXCJQYXJzZSBFcnJvcjogXCIgKyBodG1sO1xyXG5cdFx0bGFzdCA9IGh0bWw7XHJcblx0fVxyXG5cclxuXHQvLyBDbGVhbiB1cCBhbnkgcmVtYWluaW5nIHRhZ3NcclxuXHRwYXJzZUVuZFRhZygpO1xyXG5cclxuXHRmdW5jdGlvbiBwYXJzZVN0YXJ0VGFnKHRhZywgdGFnTmFtZSwgcmVzdCwgdW5hcnkpIHtcclxuXHRcdHRhZ05hbWUgPSB0YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcblxyXG5cdFx0aWYgKGJsb2NrW3RhZ05hbWVdKSB7XHJcblx0XHRcdHdoaWxlIChzdGFjay5sYXN0KCkgJiYgaW5saW5lW3N0YWNrLmxhc3QoKV0pIHtcclxuXHRcdFx0XHRwYXJzZUVuZFRhZyhcIlwiLCBzdGFjay5sYXN0KCkpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGNsb3NlU2VsZlt0YWdOYW1lXSAmJiBzdGFjay5sYXN0KCkgPT0gdGFnTmFtZSkge1xyXG5cdFx0XHRwYXJzZUVuZFRhZyhcIlwiLCB0YWdOYW1lKTtcclxuXHRcdH1cclxuXHJcblx0XHR1bmFyeSA9IGVtcHR5W3RhZ05hbWVdIHx8ICEhdW5hcnk7XHJcblxyXG5cdFx0aWYgKCF1bmFyeSlcclxuXHRcdFx0c3RhY2sucHVzaCh0YWdOYW1lKTtcclxuXHJcblx0XHRpZiAoaGFuZGxlci5zdGFydCkge1xyXG5cdFx0XHR2YXIgYXR0cnMgPSBbXTtcclxuXHJcblx0XHRcdHJlc3QucmVwbGFjZShhdHRyLCBmdW5jdGlvbiAobWF0Y2gsIG5hbWUpIHtcclxuXHRcdFx0XHR2YXIgdmFsdWUgPSBhcmd1bWVudHNbMl0gPyBhcmd1bWVudHNbMl0gOlxyXG5cdFx0XHRcdFx0YXJndW1lbnRzWzNdID8gYXJndW1lbnRzWzNdIDpcclxuXHRcdFx0XHRcdFx0YXJndW1lbnRzWzRdID8gYXJndW1lbnRzWzRdIDpcclxuXHRcdFx0XHRcdFx0XHRmaWxsQXR0cnNbbmFtZV0gPyBuYW1lIDogXCJcIjtcclxuXHJcblx0XHRcdFx0YXR0cnMucHVzaCh7XHJcblx0XHRcdFx0XHRuYW1lOiBuYW1lLFxyXG5cdFx0XHRcdFx0dmFsdWU6IHZhbHVlLFxyXG5cdFx0XHRcdFx0ZXNjYXBlZDogdmFsdWUucmVwbGFjZSgvKF58W15cXFxcXSlcIi9nLCAnJDFcXFxcXFxcIicpIC8vXCJcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpZiAoaGFuZGxlci5zdGFydCkge1xyXG5cdFx0XHRcdGhhbmRsZXIuc3RhcnQodGFnTmFtZSwgYXR0cnMsIHVuYXJ5KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHBhcnNlRW5kVGFnKHRhZywgdGFnTmFtZSkge1xyXG5cdFx0Ly8gSWYgbm8gdGFnIG5hbWUgaXMgcHJvdmlkZWQsIGNsZWFuIHNob3BcclxuXHRcdGlmICghdGFnTmFtZSlcclxuXHRcdFx0dmFyIHBvcyA9IDA7XHJcblxyXG5cdFx0Ly8gRmluZCB0aGUgY2xvc2VzdCBvcGVuZWQgdGFnIG9mIHRoZSBzYW1lIHR5cGVcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0YWdOYW1lID0gdGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRmb3IgKHZhciBwb3MgPSBzdGFjay5sZW5ndGggLSAxOyBwb3MgPj0gMDsgcG9zLS0pXHJcblx0XHRcdFx0aWYgKHN0YWNrW3Bvc10gPT0gdGFnTmFtZSlcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHBvcyA+PSAwKSB7XHJcblx0XHRcdC8vIENsb3NlIGFsbCB0aGUgb3BlbiBlbGVtZW50cywgdXAgdGhlIHN0YWNrXHJcblx0XHRcdGZvciAodmFyIGkgPSBzdGFjay5sZW5ndGggLSAxOyBpID49IHBvczsgaS0tKVxyXG5cdFx0XHRcdGlmIChoYW5kbGVyLmVuZClcclxuXHRcdFx0XHRcdGhhbmRsZXIuZW5kKHN0YWNrW2ldKTtcclxuXHJcblx0XHRcdC8vIFJlbW92ZSB0aGUgb3BlbiBlbGVtZW50cyBmcm9tIHRoZSBzdGFja1xyXG5cdFx0XHRzdGFjay5sZW5ndGggPSBwb3M7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuXHJcbmZ1bmN0aW9uIG1ha2VNYXAoc3RyKSB7XHJcblx0dmFyIG9iaiA9IHt9LCBpdGVtcyA9IHN0ci5zcGxpdChcIixcIik7XHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKylcclxuXHRcdG9ialtpdGVtc1tpXV0gPSB0cnVlO1xyXG5cdHJldHVybiBvYmo7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSFRNTFBhcnNlcjtcclxuIl19