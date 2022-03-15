let video_data = JSON.parse(localStorage.getItem("youTube"));
    let recommend_video = JSON.parse(localStorage.getItem("recommended"));
    let video_div = document.getElementById("video_details")
    let rec_div = document.getElementById("recommendation")
    oneVideo(video_data);
    appendVideos(recommend_video);

    // iframe
    function oneVideo(video_data){
        video_div.innerHTML = null;
        let iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${video_data.videoId}`;
        iframe.height = "80%";
        iframe.width = "100%";
        iframe.setAttribute("allowfullscreen","true");
        let title = document.createElement("p")
        title.innerHTML = video_data.snippet.title;
        title.style.fontSize = "20px";
        iframe.style.border = "none"
        video_div.append(iframe,title)
    }


    function appendVideos(items){
        rec_div.innerHTML = null;
        items.forEach(( { snippet,id:{videoId} } )=>{

            let div1 = document.createElement("div");
            let div2 = document.createElement("div");
            let div = document.createElement("div");

            div1.style.border = "1px solid red;"
            div1.style.width = "55%";
            div1.style.height = "100%"
            div1.style.marginRight = "3%"

            div2.style.border = "1px solid red;"
            div2.style.width = "40%";
            div2.style.height = "100%"
            div2.style.fontSize = "15px"

            let title = document.createElement("p");
            title.innerHTML = snippet.title;

            let thumbnail = document.createElement("img");
            thumbnail.src = snippet.thumbnails.medium.url;
            thumbnail.style.width = "100%";
            thumbnail.style.height = "100%";

            let data_to_send = {
                snippet,
                videoId
            }

            div.onclick = () =>{
                showVideo(data_to_send)
            }

            div1.append(thumbnail);
            div2.append(title)
            div.append(div1,div2);
            rec_div.append(div);
        });
    }

    function showVideo(sendData){
        localStorage.setItem("youTube",JSON.stringify(sendData));
        let video_data = JSON.parse(localStorage.getItem("youTube"));
        oneVideo(video_data);
    }