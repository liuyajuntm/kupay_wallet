<div w-class="itemGroup">
    {{for ind,val of it.list}}
    <div w-class="item" on-tap="changeSelect(e,{{ind}})">
        <span style="flex: 1">{{val}}</span>
        {{if it.selected == ind}}
        <img src="../../res/image/16.png" style="width: 40px;height: 40px;"/>
        {{end}}
    </div>
    {{end}}

</div>