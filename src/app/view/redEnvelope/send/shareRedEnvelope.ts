/**
 * send red-envelope to other
 */
import { ShareToPlatforms } from '../../../../pi/browser/shareToPlatforms';
import { popNew } from '../../../../pi/ui/root';
import { Widget } from '../../../../pi/widget/widget';
import { RedEnvelopeType, sharePerUrl } from '../../../store/conMgr';

interface Props {
    rid: string;
    leaveMessage: string;
    currencyName: string;
}
export class ShareRedEnvelope extends Widget {
    public ok: () => void;
    public props: Props;

    // 发送给好友
    public shareToFriends() {
        popNew('app-components-share-share', { 
            shareType: ShareToPlatforms.TYPE_LINK,
            // tslint:disable-next-line:max-line-length
            url:`${sharePerUrl}?type=${RedEnvelopeType.Normal}&rid=${this.props.rid}&lm=${(<any>window).encodeURIComponent(this.props.leaveMessage)}`,
            title:'等额红包',
            content:this.props.leaveMessage
        });
        this.ok && this.ok();
    }
}