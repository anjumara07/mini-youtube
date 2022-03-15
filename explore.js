 let results_div = document.getElementById("search_results");
    async function defaultVideo(){
        try{
            let response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=trendingvideoinindia&type=video&key=AIzaSyBgFzjs_CYrpGAdiNUrjZ7mXuZk-FxHVbQ&maxResults=32`);
            let data = await response.json();
            let videos = data.items;
            appendVideos(videos);
            // console.log("data:", videos);
        }
        catch(e){
            console.log("e:" ,e);
        }
    };
    defaultVideo()

    const appendVideos = (items)=>{
        items.forEach(( { snippet,id:{videoId} } )=>{

            let div = document.createElement("div");

            let title = document.createElement("p");
            title.innerHTML = snippet.title;

            let thumbnail = document.createElement("img");
            thumbnail.src = snippet.thumbnails.medium.url;

            let data_to_send = {
                snippet,
                videoId
            }

            div.onclick = () =>{
                showVideo(data_to_send)
            }

            div.append(thumbnail,title);
            results_div.append(div);
        });
    }

    function showVideo(sendData){
        localStorage.setItem("youTube",JSON.stringify(sendData));
        window.location.href = "video.html";
    }