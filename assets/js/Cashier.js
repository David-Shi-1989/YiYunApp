function CashierModal () {
  var me = {
    def: {
      selector: {
        curTimeDOMId: 'yy_curTime',
        curTimeTplId: 'yy_tpl_curTime',
        listDOM: 'yy_list',
        listTpl: 'yy_tpl_list'
      }
    },
    mainList: {
      value: [],
      getList: function () {
        for (var i = 0; i < this.value.length; i++) {
          this.value[i]._index = i
        }
        return this.value;
      },
      push: function (item) {
        this.value.push(item);
        this.onchange()
      },
      remove: function (item) {
        for (var i = 0; i < this.value.length; i++) {
          var curItem = this.value[i];
          if (item.name == curItem.name && item._index == i) {
            this.removeAtIndex(i);
            break;
          }
        }
      },
      removeAtIndex: function (index) {
        if (!isNaN(index) && index >= 0 && index < this.value.length) {
          this.value.splice(index, 1);
          this.onchange();
        }
      },
      onchange () {
        commonTplRender(me.def.selector.listDOM, me.def.selector.listTpl, {list: this.getList()})
      }
    }
  };
  Object.defineProperties(me, {
    _curDateTime: {
      value: Date.now(),
      writable: true,
      configurable: false
    },
    curDateTime: {
      get: function () {
        return (new Date(this._curDateTime)).Format('yyyy/MM/dd hh:mm:ss');
      },
      set: function (newVal) {
        if (typeof(newVal) == 'number' && newVal > 0) {
          this._curDateTime = parseInt(newVal)
        } else if (typeof(newVal) == 'object' && newVal.getFullYear) {
          this._curDateTime = newVal.valueOf()
        }
        commonTplRender(this.def.selector.curTimeDOMId, this.def.selector.curTimeTplId, {value: this.curDateTime})
      }
    }
  })
  function commonTplRender (domId, tplId, data) {
    $('#' + domId).html(TplUtil.renderTplHtmlWithData(tplId, data))
  }
  function renderMainListHtml () {
    commonTplRender(this.def.selector.curTimeDOMId, this.def.selector.curTimeTplId, {value: this.curDateTime})
  }
  return me
}