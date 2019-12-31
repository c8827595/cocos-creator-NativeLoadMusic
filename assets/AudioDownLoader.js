let audioUrlMap = {};  // key: url, value: { loadingItem, callback }

function downloadAudio (item, callback) {
    let audioDownloader = new jsb.Downloader();
    if (/^http/.test(item.url)) {
        let index = item.url.lastIndexOf('/');
        let fileName = item.url.substr(index+1);
        let storagePath = jsb.fileUtils.getWritablePath() + fileName;

        if (jsb.fileUtils.isFileExist(storagePath)) { //已有資料 直接取
            item.url = storagePath;
            item.rawUrl = storagePath;
            callback && callback(null, item);
        }

        else {
            audioUrlMap[item.url] = { item, callback };
            audioDownloader.createDownloadFileTask(item.url, storagePath); //將mp3下載到本地
            audioDownloader.setOnFileTaskSuccess(function (Sender) //下載完播放
            {
                item.rawUrl = storagePath;
                callback(null, item);
            });
         
        }
    }
    else {
        return item.url;
    }
}


module.exports = downloadAudio;