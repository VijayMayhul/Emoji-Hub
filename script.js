async function fetchData() {
    try {
      const response = await fetch("https://emojihub.yurace.pro/api/all");
      const data = await response.json();
      
      let emojiAr = [];
  
      for (let i = 0; i < data.length; i++) {
        let emojiObj = {
          emojiTitle: data[i].name,
          emojiImg: data[i].htmlCode[0],
          emojiCategory: data[i].category,
          emojiGroup: data[i].group,
          emojiHtmlCode: data[i].htmlCode[0].replace("&", "&amp;"),
          emojiUniCode: data[i].unicode,
        };
        emojiAr.push(emojiObj);
      }
      
      const container = document.createElement("div");
      container.setAttribute("class", "container overflow-hidden");
  
      const heading1 = document.createElement("h1");
      heading1.setAttribute("class", "text-center text-warning title");
      heading1.setAttribute("id", "title");
      heading1.innerHTML = `<span class="bg-white px-3"><i class="fa-solid fa-icons"></i> Emoji-Hub</span>`;
  
      const row = document.createElement("div");
      row.setAttribute("class", "row");
  
      for (let i = 0; i < emojiAr.length; i++) {
        let col = document.createElement("div");
        col.setAttribute(
          "class",
          "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4 col-div"
        );
          //col-sm-6 col-md-5 col-lg-4 col-xl-4
  
        let card = document.createElement("div");
        card.setAttribute(
          "class",
          "card h-100"
        );
        card.setAttribute("id", emojiAr[i].emojiTitle);
  
        let cardHeader = document.createElement("div");
        cardHeader.setAttribute("class", "card-header");
  
        let cardTitle = document.createElement("h5");
        cardTitle.setAttribute(
          "class",
          "card-title text-center py-3 px-5 bg-dark text-info m-0"
        );
        cardTitle.innerText = emojiAr[i].emojiTitle;
  
        let cardBody = document.createElement("div");
        cardBody.setAttribute(
          "class",
          "card-body d-flex flex-column justify-content-center align-items-center text-center"
        );
  
        let cardImg = document.createElement("p");
        cardImg.setAttribute("class", "fa-5x");
        cardImg.innerHTML = emojiAr[i].emojiImg;
  
        let emojiDetailsDiv = document.createElement("div");
        emojiDetailsDiv.setAttribute("class", "card-text text-white");
  
        emojiDetailsDiv.innerHTML = `
              <p><strong>Name</strong> : ${emojiAr[i].emojiTitle}</p>
              <p><strong>Catagory</strong>  : ${emojiAr[i].emojiCategory}</p>
              <p><strong>Group</strong> : ${emojiAr[i].emojiGroup}</p>
              <p><strong>HTML-Code</strong> : ${emojiAr[i].emojiHtmlCode}</p>
              <p><strong>Uni-Code</strong> : ${emojiAr[i].emojiUniCode}</p>
          `;
  
        let cardFooter = document.createElement("div");
        cardFooter.setAttribute("class", "card-footer");
  
        let copyButton = document.createElement("a");
        copyButton.setAttribute("class", "btn btn-primary my-1");
        copyButton.setAttribute(
          "onClick",
          `copyHtmlCode(this, '${emojiAr[i].emojiImg}')`
        );
        copyButton.innerText = `Copy Html Code`;
  
        // Appending Elements
        cardFooter.appendChild(copyButton);
        cardBody.append(cardImg, emojiDetailsDiv);
        cardHeader.appendChild(cardTitle);
        card.append(cardHeader, cardBody, cardFooter);
        col.appendChild(card);
        row.appendChild(col);
      }
  
      container.append(heading1, row);
      document.body.append(container);
    } catch (error) {
      alert(error);
    }
  }
  
  async function copyHtmlCode(button, htmlCode) {
    try {
      await navigator.clipboard.writeText(htmlCode);
      button.innerText = "✓ HTML Code Copied";
      button.setAttribute("class", "btn btn-success disabled");
      setTimeout(() => {
        button.innerText = `Copy Html Code`;
        button.setAttribute("class", "btn btn-primary");
      }, 5000);
    } catch (err) {
      alert('Unable to copy: ', err);
    }
  }
  
  fetchData();
