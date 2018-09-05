<div  w-class="ga-new-page">
    <div w-class="ga-main">
        <img w-class="ga-logo" src="../shareImage/img_logo.png"/>
        <div w-class="ga-title">KuPay安全的一站式资产管理平台</div>
        {{if it1.download}}
        <a href="http://share.kupay.io/KuPay.apk" download="KuPay.apk" w-class="download"><div w-class="ga-download-btn" >立即下载</div></a>
        {{else}}
        <div w-class="ga-download-btn" on-tap="downloadClick">立即下载</div>
        {{end}}
        <div w-class="ga-version">V1.0.1</div>
        <div w-class="ga-installation-tutorial">
            <div w-class="ga-install-title">Android安装教程</div>
            <div w-class="ga-steps">
                {{for index,item of it1.installTutorial}}
                <div w-class="ga-step-item">
                    <div w-class="ga-box"><span w-class="ga-step-tag">step&nbsp;{{index+1}}</span><span w-class="ga-step-content">{{item}}</span></div>
                    <img src="../shareImage/img_logo.png" w-class="ga-step-img"/>
                </div>
                {{end}}
            </div>
        </div>
    </div>
</div>