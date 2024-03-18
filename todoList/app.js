
// созхдать крестик 
(async function(){
  const data = await fetch("http://localhost:3000/posts")
  const formatedData = await data.json()
  console.log(formatedData)
  formatedData.forEach(elem=>{

  const span = document.createElement("SPAN");
  const txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  span.onclick = async function() {
    var div = this.parentElement;
    div.style.display = "none";
    await fetch(`http://localhost:3000/posts/${this.parentElement.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
  }

    const li = document.createElement("li");
    li.classList.value = elem.checked
    li.id = elem.id
     taskText = document.createTextNode(elem.text);
    li.appendChild(taskText);

    if (elem.date !== '' && elem.date !== undefined) {
      var dateSpan = document.createElement("SPAN");

      var currentDate = new Date();
      const elemDate = new Date(elem.date)
      elemDate.setHours(24)
      if (currentDate > elemDate) {
        dateSpan.style.color = "red";
      } else {
        dateSpan.style.color = "#888";
      }

      dateSpan.appendChild(document.createTextNode(' (Дата: ' + elem.date + ')'));
      li.appendChild(dateSpan);
    }

    li.appendChild(span);
    document.getElementById("myUL").appendChild(li);
  })
  

})()
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

//удалить

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = async function() {
    var div = this.parentElement;
    div.style.display = "none";
    console.log(this)
  }
}

//отметить

var list = document.querySelector('ul');
list.addEventListener('click', async function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
    console.log(ev.target.innerText)
    await fetch(`http://localhost:3000/posts/${ev.target.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({checked: ev.target.classList.value})
    })
  }
}, false);

//добавить

async function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var inputDateValue = document.getElementById("myDate").value;
  
  if (inputValue === '') {
    alert("Ну напиши уже хоть что-нибудь!");
  } else {
    var taskText = document.createTextNode(inputValue);
    li.appendChild(taskText);

    if (inputDateValue !== '') {
      var dateSpan = document.createElement("SPAN");

      var currentDate = new Date();
      var inputDate = new Date(inputDateValue);

      if (currentDate > inputDate) {
        dateSpan.style.color = "red";
      } else {
        dateSpan.style.color = "#888";
      }

      dateSpan.appendChild(document.createTextNode(' (Дата: ' + inputDateValue + ')'));
      li.appendChild(dateSpan);
    }

    const data = await fetch("http://localhost:3000/posts", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({text: inputValue, date: inputDateValue, checked: ""})
    })
    const formatedRes = await data.json()
    li.id = formatedRes.id
    document.getElementById("myUL").appendChild(li);
    
  }

  document.getElementById("myInput").value = "";
  document.getElementById("myDate").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  span.onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

//изменение цвета в зависимости от времени суток
function updateTimeOfDay() {
  const section = document.getElementById('timeOfDaySection');
  const currentTime = new Date().getHours();

  let backgroundColor;
  if (currentTime >= 5 && currentTime < 9) {
    backgroundColor = '#1773fc';
  } else if (currentTime >= 9 && currentTime < 12) {
    backgroundColor = '#5f9fff';
  } else if (currentTime >= 12 && currentTime < 17) {
    backgroundColor = '#fdff6d';
  } else if (currentTime >= 17 && currentTime < 21) {
    backgroundColor = '#ff5733';
  } else {
    backgroundColor = '#1a1a1a';
  }

  section.style.background = backgroundColor;
}

setInterval(updateTimeOfDay, 2000, "r"); 