<div class="new-page" w-class="new-page" ev-back-click="backPrePage">
	<app-components1-topBar-topBar>{title:"备份助记词"}</app-components1-topBar-topBar>
	<div w-class="body">
		<div w-class="bodyTitle">
			按序选择输入助记词
		</div>
		<div w-class="screen">
			 {{for index,item of it1.nullMnemonic}}
			 <span w-class="screenItem" on-tap="confirmedMnemonicItemClick(e,{{index}})" 
			 style="{{index === 1 || index=== 4 || index === 7 || index === 10 ? 'margin:10px 10px 0;' : 'margin:10px 0 0;'}}{{it1.confirmedMnemonic[index] ? 'opacity: 1;' :'opacity: 0;'}}">
			 {{ it1.confirmedMnemonic[index] && it1.confirmedMnemonic[index].word}}
			 </span>
			 {{end}}
		</div>
		
		<div w-class="bottom-box">
			<div w-class="itemsBox">
				{{for index,item of it1.shuffledMnemonic}}
				<div w-class="item {{item.isActive ? 'checked' : ''}}" on-tap="shuffledMnemonicItemClick(e,{{index}})"  style="{{index === 1 || index=== 4 || index === 7 || index === 10 ? 'margin:10px 10px 0;' : 'margin:10px 0 0;'}}">
					{{item.word}}
				</div>
				{{end}}
			</div>
			
			<div w-class="btnBox">
				<div ev-btn-tap="nextStepClick" w-class="btn"><app-components1-btn-btn>{"name":"确定","types":"big","color":"blue"}</app-components1-btn-btn></div>
			</div>
		</div>
	</div>
</div>