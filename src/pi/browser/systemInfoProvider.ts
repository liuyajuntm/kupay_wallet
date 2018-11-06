import { NativeObject, registerSign } from './native';

/**
 * 获取设备系统的信息
 */
export class SystemInfoProvider extends NativeObject {
    /**
     * 调用底层获取设备的系统信息
     * @param param 我也不知道这个参数的干嘛的……反正要传
     */
    public getDeviceInfo(param: any) {
        this.call('getSystemInfo', param);
    }
}

/**
 * 获取设备weiyi的信息
 */
export class DeviceIdProvider extends NativeObject {
    /**
     * 调用底层获取设备的唯一id
     * @param param 我也不知道这个参数的干嘛的……反正要传
     */
    public getDriverId(param: any) {
        this.call('getUUId', param);
    }
}

/**
 * 注册方法名和参数-->设备系统信息
 */
registerSign(SystemInfoProvider, {
    getSystemInfo: []
});
/**
 * 注册方法名和参数-->设备系统信息
 */
registerSign(DeviceIdProvider, {
    getUUId: []
});