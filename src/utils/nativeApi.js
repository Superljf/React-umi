/* eslint-disable no-underscore-dangle */
import dtoUtils from "./dtoUtils";

const AJAX_FILE_TYPE = 'fs';
const nativeContext = window._android_context;

const nativeService = {
    ajaxClient: nativeContext ? nativeContext.getService('ajaxClient') : {},
    sessionManager: nativeContext ? nativeContext.getService('sessionManager') : {},
    pageManager: nativeContext ? nativeContext.getService('pageManager') : {},
};

const ajaxQueueMap = new Map();

window._android_ajax_complete = function(token) {
    const tokenObject = ajaxQueueMap.get(token);

    if (tokenObject) {
        let response = nativeService.ajaxClient.getData(token);

        if (tokenObject.type === AJAX_FILE_TYPE) {
            response = dtoUtils.resolveFileResponse(response);
        }

        if(dtoUtils.isSuccess(response) || response.data.length) {
            const fileList = response.data.map(file => (
                {
                    filename: file.fileName,
                    fileUuid: file.fileUuid,
                    fileSize: file.fileSize,
                    fileFormat: dtoUtils.resolveSuffix(file.fileName),
                }
            ));

            tokenObject.resolve(fileList);
        }

    }
};

window._android_on_resume = function() {

};

const nativeApi = {
    native() {
        if (typeof nativeContext === 'undefined') {
            return false;
        }

        return true;
    },

    /**
     * 获取会话
     */
    getSessionUuid() {
        return nativeService.sessionManager.getCurrentSessionUuid();
    },

    /**
     * 返回
     */
    back() {
        if (!this.native()) {
            return;
        }

        nativeService.pageManager.back();
    },

    close() {
      if (!this.native()) {
        return;
      }

      try {
        nativeService.pageManager.closeWebView();
      } catch (e) {
        console.log(e);
      }

      nativeService.pageManager.close();
    },

    /**
     * 获取接口地址
     * @returns {string}
     */
    getApiPath() {
        return !this.native() ? '/store/api/' : nativeContext.getApiPath();

        // return '/store/api/';
    },

    /** w文件相关* */
    /**
     * 获取文件接口
     * @returns {string}
     */
    getFsPath() {
        return !this.native() ? '/fs/api/' : nativeContext.getFsPath();

        // return '/fs/api/';
    },

    async selectImageFileAndCaptureImage(isSelectFile, limit) {
        if (!this.native()) {
            return;
        }

        const options = {
          isSelectFile: isSelectFile || false,
          maxcount: limit || "",
        };

        return new Promise((resolve) => {
            const token = nativeService.ajaxClient.selectImageFileAndCaptureImage(JSON.stringify(options));

            ajaxQueueMap.set(token, {
                type: AJAX_FILE_TYPE,
                resolve,
            });

        });
    },

    openUri(url, packageName) {
        nativeService.pageManager.loadBundle(packageName, url);
    },
};

export default nativeApi;
