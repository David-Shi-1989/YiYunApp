function CashierModal () {
  var me = {
    def: {
      selector: {
        listDOM: 'yy_list',
        listTpl: 'yy_tpl_list',
        listInputDOM: 'input_trade_list_table_tbody',
        listInputTp: 'yy_tpl_list_input'
      }
    },
    mainList: {
      value: [],
      fields: ['index','id','code','name','count','price_0','price_1','price_sum','seller','datetime'],
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
      getItem () {
        var obj = {}
        this.fields.forEach(function (key) {
          obj[key] = ''
        })
        return obj
      },
      onchange () {
        commonTplRender(me.def.selector.listDOM, me.def.selector.listTpl, {list: this.getList()})
        commonTplRender(me.def.selector.listInputDOM, me.def.selector.listInputTp, {list: this.getList()})
      },
      onInputEditClick (index) {
        if (!isNaN(index) && index >= 0 && index < this.value.length) {
          this.value[parseInt(index)].isEdit = true
          this.onchange()
        }
      },
      onInputCreateBtnClick () {
        var newItem = this.getItem()
        newItem.isEdit = true
        this.value.push(newItem)
        this.onchange()
      },
      onInputOkClick (index) {
        if (!isNaN(index) && index >= 0 && index < this.value.length) {
          var targetItem = this.value[parseInt(index)]
          this.fields.forEach(function (key) {
            targetItem[key] = $('#input_list_'+ key +'_' + index).val()
          })
          targetItem.isEdit = false
          this.onchange()
        }
      },
      onInputDeleteClick (index) {
        if (!isNaN(index) && index >= 0 && index < this.value.length) {
          this.removeAtIndex(index)
        }
      }
    },
    init () {
      this.initDefaultValue()
      this.initFormBind()
    },
    initDefaultValue () {
      this.curDateTime = Date.now()
      this.shopName = '翼云纸品'
    },
    initFormBind () {
      $("#input_shopName").val(this.shopName)
      $("#input_curDateTime").val(this.curDateTime)
    },
    onShopNameChange (input) {
      this.shopName = input.value
    },
    onCurDateTimeChange (input) {
      var newValStr = input.value
      var isValid = false
      try {
        var dd = new Date(newValStr)
        if (dd.getFullYear()) {
          this.curDateTime = dd
          isValid = true
        }
      } catch (e) {
      }
      if (!isValid) {
        alert('时间输入错误!')
        input.value = this.curDateTime
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
        $('#yy_curTime').text(this.curDateTime);
      }
    },
    _beginDateTime: {
      value: Date.now(),
      writable: true,
      configurable: false
    },
    _shopName: {
      value: '',
      writable: true,
      configurable: false
    },
    shopName: {
      get: function () {
        return this._shopName;
      },
      set: function (val) {
        if (typeof (val) == 'string') {
          this._shopName = val.trim()
          $('#yy_shopName').text(this._shopName)
        }
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