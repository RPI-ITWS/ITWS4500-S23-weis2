var ids = [];
var isShowIds = [];
var timer = null;
var timer1 = null;
var topNum = 0;
var topHei = 0;
fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    .then(response => response.json())
    .then(json => {
        ids = json;
        getData();
        getData();
        getData();
        getData();
        getData();
        timer = setInterval(() => {
            if (isShowIds.length >= 200) return clearInterval(timer);
            getData();
        },1000)
        timer1 = setInterval(() => {
            if (isShowIds.length >= 200) return clearInterval(timer1);
            topHei -= $('.list-group-item')[topNum].offsetHeight;
            console.log($('.list-group-item')[topNum].offsetHeight)
            console.log(topHei)
            topNum++;
            $('.list-group').animate({top: `${topHei}px`})
        }, 3000)
    })//The obtained json data
    .catch(err => console.log('Request Failed', err));

function getData() {
    var id = ids[random(0, 500)];
    if (isShowIds.findIndex(item => item == id) != -1) { //findIndex returns -1 if no match is found
        return getData();
    } else {
        isShowIds.push(id);
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
            .then(response => response.json())
            .then(json => {
                var currhtml = $('.list-group').html();
                currhtml += `
                <a href="${json.url}" class="list-group-item">
                    <h4 class="list-group-item-heading">${json.title}</h4>
                    <p class="list-group-item-text">Author: ${json.by} <span class="score"> Score: ${json.score}</span></p>
                </a>
                `;
                $('.list-group').html(currhtml);
            })//The obtained json data
            .catch(err => console.log('Request Failed', err));
    }
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

$.ajax({
    type: "GET",
    url: "./data/footer.json",
    dataType: "json",
    success: function(data) {
      // start building the ouput
      var output = "<div class='footer'>";

      $.each(data.cells, function(i, item) {
        output += "<div class='footer-cell'>"
        $.each(item, function(j, link) {
          output += "<a href='" + link.href + "'>" + link.text + "<img src='" + link.img + "' /></a>"
        });
        output += "</div>"
      });

      output += "</div>"

      // append the footer
      // this saves having to repeat this html everywhere
      $("body").append(output);
    },
    error: function(msg) {
      // there was a problem
      alert("There was a problem: " + msg.status + " " + msg.statusText);
    }
  });
