!(function() {
  'use strict'
  var a = self.console,
    l = Object.freeze({ NONE: 0, ERROR: 1, WARN: 2, INFO: 3, LOG: 4 }),
    d = ['error', 'warn', 'info', 'log'],
    u = window.Rollbar && window.Rollbar.options.enabled,
    s = {
      debug: ['critical', 'error', 'warn', 'debug', 'log'],
      info: ['critical', 'error', 'warn', 'info'],
      warning: ['critical', 'error', 'warn'],
      error: ['critical', 'error'],
      critical: ['critical']
    },
    c =
      void 0 !== a &&
      void 0 !== a.log &&
      void 0 !== a.error &&
      void 0 !== a.debug &&
      void 0 !== a.warn &&
      'function' == typeof Function.prototype.apply,
    f = void 0,
    t = void 0,
    i = function(e, n, t, i) {
      return a[n]
        ? t
          ? a[n](t)
          : a[n]()
        : e.log('----------- ' + (t || i) + ' ----------- ')
    },
    o = function(e) {
      var n = e.level,
        o = {
          setLevel: function(e) {
            return (n = e), o
          },
          getLevel: function() {
            return n || f
          }
        }
      return (
        d.forEach(function(i) {
          o[i] = function() {
            for (var e = arguments.length, n = Array(e), t = 0; t < e; t++)
              n[t] = arguments[t]
            return (function(e, n, t) {
              if (c) {
                var i,
                  o = d.indexOf(n),
                  r = e.getLevel()
                return (
                  ~o && o + 1 <= r && a[n].apply(a, t),
                  u &&
                    ~s[window.Rollbar.options.reportLevel].indexOf(n) &&
                    (i = window.Rollbar)[n].apply(i, t),
                  e
                )
              }
            })(o, i, n)
          }
        }),
        (o.groupCollapsed = function(e) {
          return i(o, 'groupCollapsed', e, 'GROUP START')
        }),
        (o.group = function(e) {
          return i(o, 'group', e, 'GROUP START')
        }),
        (o.groupEnd = function() {
          return i(o, 'groupEnd', null, 'GROUP END')
        }),
        (o.devError = function() {
          'production' !== process.env.NODE_ENV && o.error.apply(o, arguments)
        }),
        (o.debug = o.log),
        o
      )
    },
    e = function() {
      var e =
        0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
      e.level = e.level || l.NONE
      var n = e.newInstance || !t ? o(e) : t
      return t || e.newInstance || (t = n), n
    },
    p = {
      LOCAL: 'local',
      URL: 'url',
      CAMERA: 'camera',
      IMAGE_SEARCH: 'image_search',
      DROPBOX: 'dropbox',
      FACEBOOK: 'facebook',
      INSTAGRAM: 'instagram'
    },
    g = 'upload-finish',
    v = 'widget-view-change',
    h = 'display-changed',
    m = 'uw_init',
    y = 'uw_mini',
    w = 'uw_config',
    b = 'uw_prepare',
    x = 'uw_prebatch',
    E = 'uw_event',
    C = 'uw_show',
    O = 'uw_hide',
    _ = 'uw_tags',
    k = 'uw_upload_presets',
    R = 'uw_file',
    S = 'uw_clientbatch',
    N = [
      'buttonCaption',
      'buttonClass',
      'queueViewPosition',
      'controlVpMeta',
      'fieldName',
      'frameZIndex',
      'widgetHost'
    ],
    I = 'initial',
    T = 'expanded',
    j = 'minimized',
    F = function(e, n, t, i) {
      var o =
          4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : null,
        r = (o = o || self).document.createElement(e)
      if (((n = n || {}), t && (n.class = t), n)) {
        var a = n
        Object.keys(a).forEach(function(e) {
          return r.setAttribute(e, a[e])
        })
      }
      if (i) {
        var l = i
        Object.keys(l).forEach(function(e) {
          return (r.dataset[e] = l[e])
        })
      }
      return r
    },
    z = function(e) {
      var n =
        1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null
      return (
        (n = n || self), 'string' == typeof e ? n.document.querySelector(e) : e
      )
    },
    A = function(e) {
      e.parentNode && e.parentNode.removeChild(e)
    },
    D = function(n, t) {
      Object.keys(t).forEach(function(e) {
        n.style[e] = t[e]
      })
    },
    H = function(e) {
      D(e, { display: 'none' })
    },
    L = 'FileReader' in self && 'FileList' in self && 'Blob' in self,
    U = function(e) {
      return 'string' == typeof e
    },
    r = function(e) {
      return 'function' == typeof e
    },
    W = function(t, e) {
      var n = null
      if (t.closest) n = t.closest(e)
      else {
        var i = self.document.querySelectorAll(e)
        i &&
          i.length &&
          (n = Array.prototype.find.call(i, function(e) {
            return (
              (n = t),
              !!(
                e.compareDocumentPosition(n) &
                Node.DOCUMENT_POSITION_CONTAINED_BY
              )
            )
            var n
          }))
      }
      return n
    },
    q = 500,
    V = 55,
    B = 'right:35px',
    G = '(min-width: 767px)',
    $ = 610,
    M = 'hidden',
    P = 'shown',
    J = e(),
    K = function(o, e, r) {
      var n,
        t,
        a = /cloudinary\.com/
      J.log('[all.comms]: using pm domain regex =  ' + a.toString())
      var i = function(e, n) {
          r.widgetCallback && r.widgetCallback(n, e)
        },
        l = function(e, n) {
          var t,
            i,
            o =
              2 < arguments.length && void 0 !== arguments[2] && arguments[2]
                ? { type: e, data: n }
                : ((t = e), (i = n), JSON.stringify({ type: t, data: i }))
          r.postMessage(o)
        },
        d = function(e) {
          i({ info: e, event: h, uw_event: !0, data: { event: h, info: e } })
        },
        u = (((n = {})[v] = function(e) {
          r.handleWidgetViewTypeChange(e.info)
          var n = e.info.type === j ? j : T
          d(n)
        }),
        (n[g] = function(e) {
          if (
            (J.log('[all.comms]: received uploaded file data - ', e),
            e.info.failed)
          )
            i(e.info, { status: e.info.status, statusText: e.info.statusText }),
              r.triggerEvent('cloudinarywidgetfileuploadfail', [e.info])
          else {
            var n = e.info.uploadInfo,
              t = { event: 'success', info: n }
            r.processUploadResult(n),
              i(t),
              r.triggerEvent('cloudinarywidgetfileuploadsuccess', t)
          }
        }),
        n),
        s = (((t = {})[E] = function(e, n) {
          e.event && u[e.event]
            ? u[e.event](e, n)
            : i({ info: e.info, event: e.event, uw_event: !0, data: e })
        }),
        (t[O] = function() {
          r.hideWidget()
          var e = {
            event: 'close',
            info: { message: 'user closed the widget' }
          }
          i(e), r.triggerEvent('cloudinarywidgetclosed', e), d(M)
        }),
        (t[b] = function(e, n) {
          var t = function(e) {
              return l(b, e)
            },
            i = n.prepareUploadParams || n.uploadSignature
          'function' == typeof i
            ? i(function(e) {
                J.log('[all.comms]: received prepared data from client: ', e)
                var n = [].concat(e).map(function(e) {
                  return 'string' == typeof e ? { signature: e } : e
                })
                t(n)
              }, e.request)
            : 'string' == typeof n.uploadSignature &&
              t([{ signature: n.uploadSignature }])
        }),
        (t[x] = function(e, n) {
          if ('function' != typeof n.preBatch)
            throw new Error('UploadWidget - preBatch handler not found!')
          n.preBatch(function(e) {
            J.log('[all.comms]: received pre-batch data from client: ', e),
              l(x, e)
          }, e.request)
        }),
        (t[_] = function(e, n) {
          n.getTags(function(e) {
            J.log('[all.comms]: received tags from client: ', e),
              l(_, { tags: e })
          }, e.prefix)
        }),
        (t[k] = function(e, n) {
          n.getUploadPresets(function(e) {
            J.log('[all.comms]: received uploadPresets from client: ', e),
              l(k, { uploadPresets: e })
          })
        }),
        t)
      return (
        window.addEventListener('message', function(e) {
          var n = o()
          if (e.origin.match(a)) {
            var t = (function(n) {
                var e = void 0
                try {
                  U(n) && (e = JSON.parse(n))
                } catch (e) {
                  J.log('[all.comms]: failed to deserialize message: ', n)
                }
                return e
              })(e.data),
              i = !1
            t &&
              t.widgetId &&
              t.widgetId === n.widgetId &&
              (J.log(
                '[all.comms]: received message from widget: ' + n.widgetId,
                t
              ),
              s[t.type] && ((i = !0), s[t.type](t, n))),
              i ||
                J.log(
                  '[all.comms]: received invalid message, invalid widget ID or invalid type! ',
                  e.data
                )
          }
        }),
        { sendMessage: l, sendDisplayChangedCallback: d }
      )
    },
    X = /(left|right)(?::([0-9a-z]*))?$/,
    Q = 'head meta[name="viewport"]',
    Y = function(r, a, n) {
      var e = r(),
        o = { raw: B, side: null, offset: null },
        l = F(
          'iframe',
          { frameborder: 'no', allow: 'camera', width: '100%', height: '100%' },
          null,
          { test: 'uw-iframe' }
        )
      D(l, { border: 'none', background: 'transparent' })
      var t = window.matchMedia(G),
        d = e.inlineContainer && z(e.inlineContainer),
        u = e.frameContainer && z(e.frameContainer)
      d && D(d, { minHeight: $ + 'px', overflowX: 'hidden' }),
        u && D(u, { position: 'relative' })
      var i = null,
        s = !1,
        c = '',
        f = !1,
        p = !1,
        g = !1,
        v = !1,
        h = void 0,
        m = function(e) {
          e.preventDefault()
        },
        y = function() {
          if (!d && !u) {
            var e = g && v
            h.body &&
              ((i = null === i ? h.body.style.overflow : i),
              (h.body.style.overflow = e ? 'hidden' : i)),
              e
                ? h.addEventListener('touchmove', m)
                : h.removeEventListener('touchmove', m),
              (function(e) {
                if (!0 === r().controlVpMeta)
                  if (e) {
                    var n = z(Q, self.top)
                    n ||
                      ((n = F(
                        'meta',
                        { name: 'viewport' },
                        null,
                        null,
                        self.top
                      )),
                      h.head.appendChild(n)),
                      (n.content =
                        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
                  } else {
                    var t = z(Q, self.top)
                    s && t ? (t.content = c) : t && h.head.removeChild(t)
                  }
              })(e)
          }
        },
        w = function() {
          f && p && (H(l), (g = !1), y())
        },
        b = function() {
          f && p && (D(l, { display: 'block' }), (g = !0), y(), l.focus())
        },
        x = function() {
          var e
          ;(e = l),
            (d || (u || void 0) || document.body).appendChild(e),
            d ||
              h.addEventListener('keyup', function(e) {
                27 === e.keyCode && w()
              })
        },
        E = function(e) {
          var n = Math.min(q, window.innerWidth) + 'px'
          D(l, {
            width: e ? '100%' : n,
            bottom: e ? '0px' : '5px',
            height: V + 'px',
            top: ''
          }),
            (function(e) {
              var n = r()
              if (
                (n.queueViewPosition && n.queueViewPosition !== o.raw) ||
                !o.side ||
                !o.offset
              ) {
                o.raw = n.queueViewPosition || o.raw
                var t = X.exec(o.raw)
                if (!t)
                  throw new Error(
                    'queueViewPosition param (' +
                      (n.queueViewPosition || '') +
                      ') is invalid. (valid ex: "right:35px")'
                  )
                ;(o.side = t[1]), (o.offset = t[2] || '0')
              }
              var i = void 0
              ;(i = e
                ? { left: '0px', right: '0px' }
                : 'left' === o.side
                ? { left: o.offset || '', right: '' }
                : { right: o.offset || '', left: '' }),
                D(l, i)
            })(e),
            (v = !1),
            y()
        },
        C = function() {
          D(
            l,
            d
              ? { height: $ + 'px', width: '100%' }
              : {
                  width: '100%',
                  height: '100%',
                  top: '0px',
                  left: '0px',
                  bottom: ''
                }
          ),
            (v = f),
            y()
        },
        O = function() {
          b(), C()
        },
        _ = function(e) {
          E(!e.matches)
        },
        k = function(e) {
          switch ((t.removeListener(_), e.type)) {
            case I:
            case T:
              C()
              break
            case j:
              E(!t.matches), t.addListener(_)
          }
        },
        R = function(e) {
          return l.contentWindow.postMessage(e, a)
        },
        S = function() {
          return p
        },
        N = function() {
          return f
        },
        A = function() {
          return f && g
        },
        L = function() {
          return N() && !v
        },
        U = function() {
          w(), (f = !1)
        },
        W = function(e) {
          ;(f = !0), p && (O(), e && e.files && H(l))
        },
        M = function() {
          f && p && !v && E(!t.matches)
        },
        P = function e() {
          l.removeEventListener('load', e),
            (p = !0),
            n({
              open: W,
              close: U,
              showWidget: b,
              hideWidget: w,
              isFrameReady: S,
              isWidgetOpen: N,
              isWidgetMinimized: L,
              isWidgetShowing: A,
              postMessage: R,
              handleWidgetViewTypeChange: k,
              optionsUpdated: M
            }),
            O()
        }
      !(function(e) {
        h = (function() {
          var e = self.document
          try {
            e = self.top.document
          } catch (e) {}
          return e
        })()
        var n,
          t,
          i = ((t = []),
          (n = e).debug && t.push('debug=true'),
          n.dev && t.push('dev=true'),
          n.cloudName && t.push('cloudName=' + n.cloudName),
          t.push(
            'pmHost=' + self.location.protocol + '//' + self.location.host
          ),
          t),
          o = a + '?' + i.join('&')
        l.setAttribute('src', o),
          H(l),
          D(l, {
            position: d ? null : u ? 'absolute' : 'fixed',
            zIndex: d ? null : e.frameZIndex || '1000000'
          }),
          l.addEventListener('load', P),
          (function() {
            if (!0 === r().controlVpMeta) {
              var e = z(Q, self.top)
              e && ((c = e.content), (s = !0))
            }
          })(),
          x()
      })(e)
    },
    Z = 'fetch' in self,
    ee =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function(e) {
            return typeof e
          }
        : function(e) {
            return e &&
              'function' == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? 'symbol'
              : typeof e
          },
    ne =
      Object.assign ||
      function(e) {
        for (var n = 1; n < arguments.length; n++) {
          var t = arguments[n]
          for (var i in t)
            Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
        }
        return e
      },
    te = function(i) {
      var o =
          1 < arguments.length && void 0 !== arguments[1]
            ? arguments[1]
            : 'GET',
        e = arguments[2],
        r = arguments[3],
        a = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : {},
        l =
          e && 'object' === (void 0 === e ? 'undefined' : ee(e))
            ? JSON.stringify(e)
            : e,
        n = Z
      return (n
        ? self.fetch(
            i,
            ne(
              { method: o, body: l, headers: r ? new Headers(r) : void 0 },
              a.fetchOptions
            )
          )
        : new Promise(function(e, n) {
            var t = new XMLHttpRequest()
            t.open(o, i),
              a.responseType && (t.responseType = a.responseType),
              (t.onerror = function() {
                return n(t)
              }),
              (t.ontimeout = function() {
                return n(t)
              }),
              (t.onload = function() {
                return e(t)
              }),
              (function(n, e) {
                if (e) {
                  var t = e
                  Object.keys(t).forEach(function(e) {
                    return n.setRequestHeader(e, t[e])
                  })
                }
              })(t, r),
              t.send(l)
          })
      ).then(
        function(e, n, t) {
          var i = n.responseType,
            o = function(e) {
              return (t.response = e), t
            }
          return !n.dontRead && e && t.ok
            ? i && t[i]
              ? t[i]().then(o)
              : t.json().then(o)
            : t
        }.bind(null, n, a)
      )
    },
    ie = e(),
    oe = 'cloudinary-button',
    re = 'cloudinary-thumbnails',
    ae = 'cloudinary-thumbnail',
    le = 'cloudinary-delete',
    de = function(e) {
      return e.fieldName || 'image'
    },
    ue = function(e, n) {
      var t = n.form
      return !t && e && (t = W(e, 'form')), t
    },
    se = function(e, n, t) {
      var i = ue(n, t)
      i &&
        (i = z(i)) &&
        (function(e, n, t) {
          var i = F('input', { type: 'hidden', name: de(t) }, null, {
            cloudinaryPublicId: e.public_id
          })
          i.value =
            [e.resource_type, e.type, e.path].join('/') + '#' + e.signature
          try {
            i.dataset.cloudinary = JSON.stringify(e)
          } catch (e) {
            ie.error(
              '[all.pageIntegrations]: failed to add info as serialized data attribute'
            )
          }
          n.appendChild(i)
        })(e, i, t)
    },
    ce = function(o, r, a, l, d, u) {
      o.addEventListener('click', function n(e) {
        var t,
          i =
            ((t = d).deleteHost
              ? t.deleteHost
              : 'https://api' +
                (t.dev ? '-dev' : t.staging ? '-staging' : '') +
                '.cloudinary.com') +
            '/v1_1/' +
            d.cloudName +
            '/delete_by_token'
        return (
          ie.log(
            '[all.pageIntegrations]: \n        about to send delete request with token: ' +
              l.delete_token +
              ' to : ' +
              i
          ),
          e.preventDefault(),
          te(
            i,
            'POST',
            { token: l.delete_token },
            { 'Content-Type': 'application/json' },
            { dontRead: !0 }
          )
            .then(function(e) {
              200 === e.status &&
                (ie.log('[all.pageIntegrations]: successfully deleted file'),
                o.removeEventListener('click', n),
                (function(e, n, t, i) {
                  A(e)
                  var o = ue(n, i)
                  if (o) {
                    var r = o.querySelector(
                      'input[name="' +
                        de(i) +
                        '"][data-cloudinary-public-id="' +
                        t.public_id +
                        '"]'
                    )
                    r && A(r)
                  }
                })(r, a, l, d),
                u.triggerEvent('cloudinarywidgetdeleted', l))
            })
            .catch(function(e) {
              ie.warn(
                '[all.pageIntegrations]: failed to delete file with status: ' +
                  e.status
              )
            })
        )
      })
    },
    fe = function(e, n, t, i) {
      if (!1 !== t.thumbnails && (t.thumbnails || n)) {
        var o = !0,
          r = z('.' + re)
        if (
          (r || ((o = !1), (r = F('ul', null, re))),
          r.appendChild(
            (function(e, n, t, i) {
              var o = F('li', null, ae, { cloudinary: JSON.stringify(e) }),
                r = void 0
              e.thumbnail_url
                ? (r = F('img', { src: e.thumbnail_url })).addEventListener(
                    'load',
                    function e() {
                      o.classList.add('active'),
                        r.removeEventListener('load', e)
                    }
                  )
                : ((r = F('span')).textContent = e.public_id)
              if ((o.appendChild(r), e.delete_token)) {
                var a = F('a', { href: '#' }, le)
                ;(a.textContent = 'x'), o.appendChild(a), ce(a, o, n, e, t, i)
              }
              return o
            })(e, n, t, i)
          ),
          !o)
        ) {
          ie.log('[all.pageIntegrations]: adding thumbnails list to dom')
          var a = t.thumbnails && z(t.thumbnails)
          a ? a.appendChild(r) : n && n.insertAdjacentElement('afterend', r)
        }
      }
    },
    pe = function(e, n) {
      return 0 === n ? e : e.substr(0, 1).toUpperCase() + e.substr(1)
    },
    n = function(t) {
      return Object.keys(t).reduce(function(e, n) {
        return (
          (e[
            0 < n.indexOf('_')
              ? n
                  .split('_')
                  .map(pe)
                  .join('')
              : n
          ] = t[n]),
          e
        )
      }, {})
    },
    ge = ['keepWidgetOpen', 'stylesheet'],
    ve = Object.prototype.toString,
    he = function(n) {
      return ge.forEach(function(e) {
        void 0 !== n[e] &&
          (function() {
            var e
            ;(e = console).warn.apply(e, arguments)
          })(
            "Cloudinary.UploadWidget - '" +
              e +
              "' is no longer used in this version."
          )
      })
    },
    me = function(e) {
      return e ? n(e) : {}
    },
    ye = e(),
    we = 'DATA_URL',
    be = 'ARRAY_BUFFEr',
    xe = e(),
    Ee = 0,
    Ce = function(g) {
      var v = null,
        l = function(n, e, t, i, l) {
          var d,
            u,
            o,
            r,
            a,
            s,
            c,
            f,
            p = void 0
          return (
            !i.maxFileSize || (0 < i.maxFileSize && n.size <= i.maxFileSize)
              ? (v ||
                  ((d = []),
                  (u = new FileReader()),
                  (o = null),
                  (r = function() {
                    o &&
                      o.readResolve({
                        file: o.file,
                        index: o.index,
                        count: o.count,
                        result: u.result
                      }),
                      a()
                  }),
                  (a = function() {
                    ;(o = null),
                      u.removeEventListener('load', r, !1),
                      u.removeEventListener('error', s, !1),
                      d.length && c(d.shift())
                  }),
                  (s = function() {
                    ye.log('[utils.fileReader]: failed to read file', u.error),
                      o && o.readReject(u.error),
                      a()
                  }),
                  (c = function(e) {
                    ;(o = e),
                      u.addEventListener('load', r, !1),
                      u.addEventListener('error', s, !1),
                      e.readAs === be
                        ? u.readAsArrayBuffer(e.file)
                        : u.readAsDataURL(e.file)
                  }),
                  (f = function(i, o) {
                    var r =
                        2 < arguments.length && void 0 !== arguments[2]
                          ? arguments[2]
                          : 0,
                      a =
                        3 < arguments.length && void 0 !== arguments[3]
                          ? arguments[3]
                          : 0
                    return new Promise(function(e, n) {
                      var t = {
                        file: o,
                        index: r,
                        count: a,
                        readAs: i,
                        readResolve: e,
                        readReject: n
                      }
                      1 !== u.readyState ? c(t) : d.push(t)
                    })
                  }),
                  (v = {
                    readAsUrl: function(e) {
                      var n =
                          1 < arguments.length && void 0 !== arguments[1]
                            ? arguments[1]
                            : 0,
                        t =
                          2 < arguments.length && void 0 !== arguments[2]
                            ? arguments[2]
                            : 0
                      return f(we, e, n, t)
                    },
                    readAsBuffer: function(e) {
                      var n =
                          1 < arguments.length && void 0 !== arguments[1]
                            ? arguments[1]
                            : 0,
                        t =
                          2 < arguments.length && void 0 !== arguments[2]
                            ? arguments[2]
                            : 0
                      return f(be, e, n, t)
                    }
                  })),
                (p = v
                  .readAsUrl(n, e, t)
                  .then(function(e) {
                    return (
                      (t = l),
                      (i = (n = e).file),
                      (o = n.result),
                      (r = n.index),
                      (a = n.count),
                      void g.sendMessage(
                        R,
                        {
                          lastModified: i.lastModified,
                          lastModifiedDate: i.lastModifiedDate,
                          name: i.name,
                          size: i.size,
                          type: i.type,
                          file: o,
                          index: r,
                          count: a,
                          batchId: t
                        },
                        !0
                      )
                    )
                    var n, t, i, o, r, a
                  })
                  .catch(function(e) {
                    xe.error(
                      '[global.all.uploadsHandler]: failed to send file data to widget for upload',
                      e.code,
                      n
                    )
                  })))
              : xe.log(
                  '[global.all.uploadsHandler]: provided file is larger than max file size configured',
                  n.size
                ),
            p
          )
        },
        r = function(o, r, a) {
          return Promise.race(
            Array.prototype.map.call(o, function(e, n) {
              var t,
                i = null
              return (
                (t = e),
                L && (t instanceof File || '[object File]' === t.toString())
                  ? (i = l(e, n, o.length, r, a))
                  : U(e)
                  ? g.sendMessage(R, {
                      file: e,
                      index: n,
                      count: o.length,
                      batchId: a
                    })
                  : xe.warn(
                      '[global.all.uploadsHandler]: unknown type of object sent to upload',
                      e
                    ),
                i
              )
            })
          )
        }
      return {
        handleFiles: function(e, n) {
          return e && e.files && e.files.length
            ? ((t = e.files),
              (i = n),
              (o = 'batch_' + (Ee += 1)),
              g.sendMessage(S, { batchId: o, count: t.length }),
              r(t, i, o))
            : Promise.resolve()
          var t, i, o
        }
      }
    },
    Oe = e(),
    _e = 0,
    ke = function(e, n) {
      var t = (function(e, n) {
        if (((e = e || {}), '[object Object]' !== ve.call(e)))
          throw new Error(
            '[Cloudinary.UploadWidget]: widget options must be a valid Object'
          )
        var t = me(e)
        return (
          (t.secure = !1 !== t.secure),
          (t.requirePrepareParams =
            !!t.prepareUploadParams || !!t.uploadSignature),
          (t.useTagsCallback = r(t.getTags)),
          (t.useUploadPresetsCallback = r(t.getUploadPresets)),
          (t.usePreBatchCallback = r(t.preBatch)),
          (t.inlineMode = !!t.inlineContainer),
          (t.fieldName = e.fieldName || (n && n.getAttribute('name')) || null),
          he(t),
          t
        )
      })(e, n)
      return (_e += 1), (t.widgetId = 'widget_' + _e), t
    },
    Re = function(e, a, l) {
      l = (function(e, n) {
        var t = e || (n && n.element)
        if (t) {
          try {
            t = z(t)
          } catch (e) {
            throw new Error(
              "[Cloudinary.UploadWidget]: 'element' param must either be a valid HTMLElement or a selector string"
            )
          }
          if (!t || !t.nodeType)
            throw new Error(
              "[Cloudinary.UploadWidget]: 'element' param must resolve to a valid HTMLElement"
            )
        }
        return t
      })(l, e)
      var r = ke(e, l)
      if (r.inlineContainer && !z(r.inlineContainer))
        throw new Error(
          "[Cloudinary.UploadWidget]: 'inlineContainer' param must either be a valid HTMLElement or a selector string"
        )
      delete r.element
      var n,
        t = void 0,
        d = void 0,
        u = void 0,
        s = void 0,
        c = void 0,
        f = function(e, n) {
          r.$ && r.$(l || r.form || document).trigger(e, n)
        },
        i = function(e) {
          return t
            ? t.then(e).catch(function(e) {
                return Oe.error(
                  'Cloudinary.UploadWidget - encountered error ! ',
                  e
                )
              })
            : Oe.error(
                'Cloudinary.UploadWidget - Widget frame API not ready yet!'
              )
        },
        p = function(n, t) {
          return i(function(e) {
            e.open(t),
              e.isFrameReady() &&
                (d.sendMessage(C, { source: n, options: t }, !0),
                u.handleFiles(t, g()).then(function() {
                  setTimeout(function() {
                    e.showWidget(), d.sendDisplayChangedCallback(P)
                  }, 150)
                }))
          })
        },
        o = function(o) {
          return i(function(e) {
            var n,
              t,
              i = me(o)
            d.sendMessage(w, i),
              (n = i),
              (t = ne({}, r)),
              N.forEach(function(e) {
                void 0 !== n[e] && (t[e] = n[e])
              }),
              (r = t),
              e.optionsUpdated()
          })
        },
        g = function() {
          return r
        }
      return (
        (n = (function() {
          var e = r.secure ? 'https:' : 'http:',
            n = void 0
          if (!0 === r.dev) n = '//widget-dev.cloudinary.com/index.html'
          else {
            var t =
              (r.widgetBase ||
                '//widget' +
                  (!0 === r.staging ? '-staging' : '') +
                  '.cloudinary.com/') + 'v2.0/n/'
            n =
              r.widgetHost ||
              t + r.cloudName + '/' + r.widgetVersion + '/index.html'
          }
          return (n = 0 !== n.indexOf('http') ? e + n : n)
        })()),
        (t = new Promise(Y.bind(null, g, n))).then(function(e) {
          ;(s = e.isWidgetShowing),
            (c = e.isWidgetMinimized),
            (d = K(
              g,
              0,
              ne(
                {
                  triggerEvent: f,
                  processUploadResult: function(e) {
                    return (
                      (n = e),
                      (t = l),
                      (i = g()),
                      (o = { triggerEvent: f }),
                      se(n, t, i),
                      void fe(n, t, i, o)
                    )
                    var n, t, i, o
                  },
                  widgetCallback: a
                },
                e
              )
            ))
          var n,
            t,
            i,
            o,
            r = g()
          d.sendMessage(m, ne({}, r, { showOnStart: e.isWidgetOpen() })),
            (u = Ce(d)),
            l &&
              ((n = l),
              (t = p),
              ((o = F(
                'a',
                { href: '#' },
                (i = r).buttonClass || oe
              )).innerHTML = i.buttonCaption || 'Upload image'),
              (n.style.display = 'none'),
              n.parentNode && n.parentNode.insertBefore(o, n.previousSibling),
              o.addEventListener('click', function(e) {
                return (
                  t(),
                  e.preventDefault && e.preventDefault(),
                  e.stopPropagation && e.stopPropagation(),
                  !1
                )
              }))
        }),
        {
          open: function(e, n) {
            return p(e, n), this
          },
          update: function(e) {
            var n = this
            return o(e).then(function() {
              return n
            })
          },
          close: function(e) {
            var n
            return (
              (n = e),
              i(function(e) {
                e.close(), d.sendMessage(O, n)
              }),
              this
            )
          },
          hide: function() {
            return (
              i(function(e) {
                return e.hideWidget()
              }),
              this
            )
          },
          show: function() {
            return (
              i(function(e) {
                return e.showWidget()
              }),
              this
            )
          },
          minimize: function() {
            return (
              i(function() {
                d.sendMessage(y)
              }),
              this
            )
          },
          isShowing: function() {
            return !!s && s()
          },
          isMinimized: function() {
            return !!c && c()
          }
        }
      )
    },
    Se = e()
  !(function(e) {
    var n,
      i = { cloudName: null, apiKey: null },
      o = e.jQuery ? e.jQuery : e.$ && e.$.fn && e.$.fn.jquery ? e.$ : null,
      r = -1 < e.location.search.indexOf('debug=true'),
      a = -1 < e.location.search.indexOf('dev=true')
    ;(n = r ? l.LOG : l.WARN),
      (f = n),
      (function() {
        try {
          var e = F('style', {
            id: 'cloudinary-uw-page-styles',
            type: 'text/css'
          })
          e.innerHTML =
            ".cloudinary-thumbnails { list-style: none; margin: 10px 0; padding: 0 }\n        .cloudinary-thumbnails:after { clear: both; display: block; content: '' }\n        .cloudinary-thumbnail { float: left; padding: 0; margin: 0 15px 5px 0; display: none } \n        .cloudinary-thumbnail.active { display: block } \n        .cloudinary-thumbnail img { border: 1px solid #01304d; border-radius: 2px; -moz-border-radius: 2px; -webkit-border-radius: 2px } \n        .cloudinary-thumbnail span { font-size: 11px; font-family: Arial, sans-serif; line-height: 14px; border: 1px solid #aaa; max-width: 150px; word-wrap: break-word; word-break: break-all; display: inline-block; padding: 3px; max-height: 60px; overflow: hidden; color: #999; } \n        .cloudinary-delete { vertical-align: top; font-size: 13px; text-decoration: none; padding-left: 2px; line-height: 8px; font-family: Arial, sans-serif; color: #01304d }\n        .cloudinary-button { background-color: #0078FF; color: #FFFFFF; text-decoration: none; font-size: 14px; line-height: 28px; height: 28x; cursor: pointer; font-weight: normal; display: inline-block; border-radius: 4px; padding: 10px 14px;}\n        .cloudinary-button:hover {-webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .5); box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .5); } "
          var n = z('head')
          n && n.appendChild(e)
        } catch (e) {
          Se.error('[all.pageStyles]: failed to apply styles')
        }
      })()
    var t = (e.cloudinary = e.cloudinary || {})
    ;(t.applyUploadWidget = function(e, n, t) {
      return Re(
        ne({}, i, { dev: a, debug: r }, n, { widgetVersion: '197', $: o }),
        t,
        e
      )
    }),
      (t.createUploadWidget = function(e, n) {
        return t.applyUploadWidget(null, e, n)
      }),
      (t.openUploadWidget = function(e, n) {
        return t.createUploadWidget(e, n).open()
      }),
      (t.setCloudName = function(e) {
        i.cloudName = e
      }),
      (t.setAPIKey = function(e) {
        i.apiKey = e
      }),
      (t.WIDGET_SOURCES = ne({}, p)),
      (t.WIDGET_VERSION = '197'),
      o &&
        (o.fn.cloudinary_upload_widget = function(e, n) {
          t.applyUploadWidget(o(this)[0], e, n)
        })
  })(self)
})()
