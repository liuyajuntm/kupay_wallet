/**
 * mine home page
 */
// ========================================================= 导入
import { ShareToPlatforms } from '../../../pi/browser/shareToPlatforms';
import { popNew } from '../../../pi/ui/root';
import { notify } from '../../../pi/widget/event';
import { Forelet } from '../../../pi/widget/forelet';
import { Widget } from '../../../pi/widget/widget';
import { GlobalWallet } from '../../core/globalWallet';
import { dataCenter } from '../../store/dataCenter';
import { find, register, unregister } from '../../store/store';
import { getMnemonic, openBasePage } from '../../utils/tools';

// ========================================================= 导出
// tslint:disable-next-line:no-reserved-keywords
declare var module: any;
export const forelet = new Forelet();
export const WIDGET_NAME = module.id.replace(/\//g, '-');

export class Home extends Widget {
    public stp: ShareToPlatforms;
    constructor() {
        super();
    }
    public create() {
        super.create();
        register('walletList', this.registerWalletsFun);
        this.init();
    }
    public destroy() {
        unregister('walletList', this.registerWalletsFun);

        return super.destroy();
    }
    public init() {
        // 获取钱包显示头像
        const walletList = find('walletList');
        const wallet = find('curWallet');
        let gwlt: GlobalWallet = null;
        let avatar = null;
        let walletName = null;
        let mnemonicBackup = null;
        if (wallet) {
            gwlt = GlobalWallet.fromJSON(wallet.gwlt);
            avatar = wallet.avatar;
            walletName = gwlt.nickName;
            mnemonicBackup = gwlt.mnemonicBackup;
        }
        this.state = {
            walletList,
            wallet,
            avatar,
            walletName,
            mnemonicBackup,
            hasNews: true,
            mineList: [{
                icon: 'icon_mine_wallet.png',
                text: '管理钱包',
                components: 'app-view-mine-walletManagement-walletList'
            },/*  {
                icon: 'icon_mine_annal.png',
                text: '交易记录',
                components: 'app-view-mine-transaction-record'
            }, */
            {
                icon: 'icon_mine_address.png',
                text: '常用地址',
                components: 'app-view-mine-addressManage-addressManage'
            },
            // {
            //     icon: 'icon_mine_Language.png',
            //     text: '语言设置',
            //     components: 'app-view-mine-languageAndcoinset-language'
            // }, 
            {
                icon: 'icon_mine_lock.png',
                text: '锁屏密码',
                components: 'app-view-mine-lockScreen-lockScreenSetting'
            },
            // {
            //     icon: 'icon_mine_money.png',
            //     text: '货币设置',
            //     components: 'app-view-mine-languageAndcoinset-coinset'
            // }, 
            {
                icon: 'icon_mine_problem.png',
                text: '常见问题',
                components: 'app-view-mine-FAQ-FAQ'
            },
            {
                icon: 'icon_mine_about.png',
                text: '关于我们',
                components: 'app-view-mine-aboutus-aboutus'
            },
            {
                icon: 'icon_mine_phone.png',
                text: '联系我们',
                components: 'app-view-mine-aboutus-aboutus'
            }

                // ,
                //  {
                //     icon: 'icon_mine_share.png',
                //     text: '分享下载链接',
                //     components: 'app-view-financialManagement-fund-share'
                // }
            ]
        };
    }

    public itemClick(e: any, index: number) {
        if (index <= 2) {
            const walletList = find('walletList');
            if (!walletList || walletList.length === 0) {
                popNew('app-components-message-message', { itype: 'error', content: '请创建钱包', center: true });

                return;
            }
            if (!find('curWallet')) {
                popNew('app-view-wallet-switchWallet-switchWallet');

                return;
            }
        }
        popNew(this.state.mineList[index].components, {}, (home) => {
            if (home) {
                notify(this.tree, 'ev-change-tab', { index: 0 });
            }

        });
    }

    public goNotice(event: any) {
        popNew('app-view-messageList-messageList', { hasNews: this.state.hasNews }, (r) => {
            if (r) {
                this.state.hasNews = false;
                this.paint();
            }
        });
    }

    public share() {
        popNew('app-components-share-share', { text: 'This is a test QRCode', shareType: ShareToPlatforms.TYPE_IMG }, (result) => {
            alert(result);
        }, (result) => {
            alert(result);
        });
    }
    public walletManagementClick() {
        if (!this.state.wallet || this.state.walletList.length === 0) {
            popNew('app-components-message-message', { itype: 'error', content: '请创建钱包', center: true });

            return;
        }
        popNew('app-view-mine-walletManagement-walletManagement', { walletId: this.state.wallet.walletId });
    }
    public async backupClick() {
        if (!this.state.wallet || this.state.walletList.length === 0) {
            popNew('app-components-message-message', { itype: 'error', content: '请创建钱包', center: true });

            return;
        }
        const close = popNew('pi-components-loading-loading', { text: '导出中...' });
        try {
            const wallet = find('curWallet');
            let passwd;
            if (!dataCenter.getHash(wallet.walletId)) {
                passwd = await openBasePage('app-components-message-messageboxPrompt', {
                    title: '输入密码', content: '', inputType: 'password'
                });
            }
            const mnemonic = await getMnemonic(wallet, passwd);
            if (mnemonic) {
                popNew('app-view-wallet-backupWallet-backupMnemonicWord', { mnemonic, passwd, walletId: wallet.walletId });
            } else {
                popNew('app-components-message-message', { itype: 'error', content: '密码错误,请重新输入', center: true });
            }
        } catch (error) {
            console.log(error);
            popNew('app-components-message-message', { itype: 'error', content: '密码错误,请重新输入', center: true });
        }
        close.callback(close.widget);
    }

    private registerWalletsFun = () => {
        this.init(); 
        this.paint();
    }
}
// ================================ 本地