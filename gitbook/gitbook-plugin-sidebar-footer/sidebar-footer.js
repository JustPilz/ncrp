require(['gitbook', 'jQuery'], function (gitbook, $) {
  var sidebarFooter;
  var pluginConfig = {};

  /**
   * function to get json from url with callback
   */
  var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
      var status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };
    xhr.send();
  };

  function getOnline() {
    getJSON('https://mafia2-online.com/api/v1/server', function (err, data) {
      var online = null;
      if (err != null) {
        return (online = 'N/A');
      } else {
        // see every area, create option element, append it to select
        data.forEach(function (server) {
          if (server.ip == '139.59.142.46') {
            return (online = server.lastPlayersCount);
          }
        });
      }
      document.getElementById('online').innerHTML = online;
    });
  }

  function getCurrentDate() {
    const t = new Date();
    const date = ('0' + t.getDate()).slice(-2);
    const month = ('0' + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear();
    return `${date}.${month}.${year}`;
  }

  function initializePlugin(config) {
    pluginConfig = config['sidebar-footer'];

    var text = pluginConfig.text;

    var dateNow = getCurrentDate();

    sidebarFooter =
      '<div class="sidebar-footer">' +
      //+ '<div class="line">Игроков онлайн: <span id="online" class="online"></span></div>'
      `<div class="line">Статус на ${dateNow}</div>` +
      '<div class="line">СЕРВЕР НЕ РАБОТАЕТ. ЗАКРЫТ НАВСЕГДА</div>' +
      //'<div class="line">IP: <span id="serverip">139.59.142.46</span> | Порт: <span id="serverport">7777</span></div>' +
      //'<p>' + dateNow + '<p>'
      '</div>';

    /*
      = '<a id="forkmegithub" href="' + pluginConfig.url + '">'
      + '<img src="' + colorRibbon.src + '" alt="Fork me on GitHub"'
      + 'data-canonical-src="' + colorRibbon.canonicalSrc + '"></img>'
      + '</a>'
      ;
      */
  }

  function getPluginConfig() {
    return pluginConfig;
  }

  gitbook.events.bind('start', function (e, config) {
    // initializePlugin(config);
    // getOnline();
    // setInterval(getOnline, 60000);
    /*
    gitbook.toolbar.createButton({
      icon: 'fa fa-github',
      label: 'GitHub',
      position: 'right',
      onClick: function() {
        window.open(pluginConfig.url);
      }
    });
    */
  });

  gitbook.events.bind('page.change', function () {
    var summaryUl = $('.book .book-summary');
    summaryUl.append(sidebarFooter);
    // getOnline();
  });
});

/*

  <div class="sidebar-footer">
 */
