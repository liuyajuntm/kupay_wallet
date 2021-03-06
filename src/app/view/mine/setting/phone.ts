/**
 * 云端绑定手机
 */
// =================================================导入
import { popNew } from '../../../../pi/ui/root';
import { getLang } from '../../../../pi/util/lang';
import { Forelet } from '../../../../pi/widget/forelet';
import { Widget } from '../../../../pi/widget/widget';
import { getMineDetail, regPhone } from '../../../net/pull';
import { getStore, setStore } from '../../../store/memstore';
// ================================ 导出
// tslint:disable-next-line:no-reserved-keywords
declare var module: any;
export const forelet = new Forelet();
export const WIDGET_NAME = module.id.replace(/\//g, '-');

export class BindPhone extends Widget {
    public ok: () => void;
    public language:any;
    constructor() {
        super();
    }
    public create() {
        super.create();
        this.language = this.config.value[getLang()];
        this.props = {
            phone:'',
            code:[],
            isSuccess:true
        };
    }

    public backPrePage() {
        this.ok && this.ok();
    }
    
    /**
     * 输入完成后确认
     */
    public async doSure() {
        if (!this.props.phone) {
            popNew('app-components1-message-message', { content: this.language.tips });
            this.props.code = [];
            this.setCode();

            return;
        }
        const data = await regPhone(this.props.phone, this.props.code.join(''));
        if (data && data.result === 1) {
            const userinfo = getStore('user/info');
            userinfo.phoneNumber = this.props.phone;
            setStore('user/info',userinfo);
            getMineDetail();
            this.ok();
        } else {
            this.props.code = [];
            this.setCode();
        }
        this.paint();
    }

    /**
     * 手机号改变
     */
    public phoneChange(e: any) {
        this.props.phone = e.value;  
    }

    /**
     * 手动为验证码输入框赋值
     */
    public setCode() {
        for (const i in [1,2,3,4]) {
            // tslint:disable-next-line:prefer-template
            (<any>document.getElementById('codeInput' + i)).value = this.props.code[i];
        }
    }

    /**
     * 验证码改变
     */
    public codeChange(e: any) {
        const v = Number(e.key) ? e.key :e.currentTarget.value.slice(-1);
        // const v = e.currentTarget.value.slice(-1);
        if (e.key === 'Backspace') {
            this.props.code.pop();
            const ind = this.props.code.length;
            if (ind >= 0) {
            // tslint:disable-next-line:prefer-template
                document.getElementById('codeInput' + ind).focus();
            }
            this.setCode();
            
        } else if (this.integerJudge(v)) {
            this.props.code.push(v);
            const ind = this.props.code.length;
            // tslint:disable-next-line:prefer-template
            document.getElementById('codeInput' + (ind - 1)).blur();
            if (ind < 4) {
            // tslint:disable-next-line:prefer-template
                document.getElementById('codeInput' + ind).focus();
            }
        }
        console.log(v,this.props.code.length);
        this.paint();
        
        setTimeout(() => {
            if (this.props.code.length === 4) {
                this.doSure();
            }
        }, 100);
    }

    /**
     * 验证码输入框聚焦
     */
    public codeFocus() {
        const ind = this.props.code.length; 
        // tslint:disable-next-line:prefer-template
        document.getElementById('codeInput' + ind).focus();
        this.paint();
    }

    /**
     * 判断是否是整数
     */
    public integerJudge(num:string) {
        const reg = /^[0-9]$/;
        
        return reg.test(num);
    }
}
