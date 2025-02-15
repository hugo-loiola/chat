(function () {
  var chat = {
    messageToSend: "",
    messageResponses: [
      "Você é uma pessoa incrível!",
      'Não importa quantas vezes você caia, o importante é sempre se levantar.Use cada erro como uma oportunidade de aprendizado e crescimento"',
      "Não tenha medo de falhar, só vence quem luta e só cai quem um dia esteve no alto",
      "Mantenha a fé em si mesmo, acredite no seu potencial",
      "Não compare a sua vida com a dos outros, você é especial e único!",
      "O teu eu é único e especial, você é muito mais do que só uma nota ou uma avaliação qualquer",
      "Deus te fez único. Saiba disso e dê-se o valor merecido",
      "Não lamente, não reclame, agradeça e sorria por tudo que tem",
      "Tudo que você tem hoje um dia já foi somente oração",
      "Se apegue em Deus, ele lhe dará consolo",
      "A sua fé move montanhas",
      "Faça hoje, amanhã talvez não chegue",
      "Cuide de quem cuida de você, zele por quem faz o seu dia ser melhor",
      "valorize os que estão contigo em dias de sol mas olhe sempre por aqueles que estão com você nos dias de chuva",
      "Feito é melhor do que perfeito, tente ou não saberá se dar conta",
      "A luz dos olhos é o brilho que Deus coloca em sua vida todo dia ao acordar",
      "Não temas, não se recue, pois quem te protege não dorme",
      "A vida é um constante recomeço",
      "A vida é única, aproveite cada momento",
      "Se quiser alguém para confiar, confie em si mesmo",
      "Nunca pergunte aos seus clientes o que eles querem, diga a eles o que eles precisam",
      "Não desista, alguém está se inspirando em você",
      "Sonhos são portas e atitudes são a chave",
    ],
    init: function () {
      this.cacheDOM();
      this.bindEvents();
      this.render();
    },
    cacheDOM: function () {
      this.$chatHistory = $(".chat-history");
      this.$button = $("button");
      this.$textarea = $("#message-to-send");
      this.$chatHistoryList = this.$chatHistory.find("ul");
    },
    bindEvents: function () {
      this.$button.on("click", this.addMessage.bind(this));
      this.$textarea.on("keyup", this.addMessageEnter.bind(this));
    },
    render: function () {
      this.scrollToBottom();
      if (this.messageToSend.trim() !== "") {
        var template = Handlebars.compile($("#message-template").html());
        var context = {
          messageOutput: this.messageToSend,
          time: this.getCurrentTime(),
        };

        this.$chatHistoryList.append(template(context));
        this.scrollToBottom();
        this.$textarea.val("");

        // responses
        var templateResponse = Handlebars.compile(
          $("#message-response-template").html()
        );
        var contextResponse = {
          response: this.getRandomItem(this.messageResponses),
          time: this.getCurrentTime(),
        };

        setTimeout(
          function () {
            this.$chatHistoryList.append(templateResponse(contextResponse));
            this.scrollToBottom();
          }.bind(this),
          1500
        );
      }
    },

    addMessage: function () {
      this.messageToSend = this.$textarea.val();
      this.render();
    },
    addMessageEnter: function (event) {
      // enter was pressed
      if (event.keyCode === 13) {
        this.addMessage();
      }
    },
    scrollToBottom: function () {
      this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
    },
    getCurrentTime: function () {
      return new Date()
        .toLocaleTimeString()
        .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
    },
    getRandomItem: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
  };

  chat.init();

  var searchFilter = {
    options: { valueNames: ["name"] },
    init: function () {
      var userList = new List("people-list", this.options);
      var noItems = $('<li id="no-items-found">No items found</li>');

      userList.on("updated", function (list) {
        if (list.matchingItems.length === 0) {
          $(list.list).append(noItems);
        } else {
          noItems.detach();
        }
      });
    },
  };

  searchFilter.init();
})();
