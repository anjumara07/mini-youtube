// API = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=tesla&type=video&key=[YOUR_API_KEY]";
    let results_div = document.getElementById("search_results");

    async function searchVideo(){
        try{
            let video_query = document.getElementById("video").value;
            let response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${video_query}&type=video&key=AIzaSyBgFzjs_CYrpGAdiNUrjZ7mXuZk-FxHVbQ&maxResults=20`);
            let data = await response.json();
            let videos = data.items;
            appendVideos(videos);
            recommend(videos);
            // console.log("data:", videos);
        }
        catch(e){
            console.log("e:" ,e);
        }
    };

    async function defaultVideo(){
        try{
            let video_query = document.getElementById("video").value;
            let response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=newhitsongs&type=video&key=AIzaSyBgFzjs_CYrpGAdiNUrjZ7mXuZk-FxHVbQ&maxResults=32`);
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
        results_div.innerHTML = null;
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

    function recommend(rec){
        localStorage.setItem("recommended",JSON.stringify(rec));
    }