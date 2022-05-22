//========================================================================================================
// POG_RaceAndGender.js
//========================================================================================================
// Esse script permite ao usuário estabelecer um gênero para cada personagem por meio de tags no campo 
// "anotação" da aba "Personagens" do banco de dados. Por exemplo: 
//                                                      <gen:male>
//                                                      <gen:female>
//
// Você não precisa se restringir a uma classificação binária! Pode atribuir o gênero que quiser ao seus
// personagens. or exemplo:
// 
//                                                      <gen:ace>
//                                                      <gen:trans>
//
// 
// O plugin irá reconhecer e cadastrar todas as classificações que você atribuir aos seus personagens. 
// Cada classificação receberá um número de cadastro que pode ser usado durante o jogo para fazer 
// comprações. por padrão o código 0 quer dizer que o genero de um personagem não foi definido.
//
// Todos os personagens que você não atribuir um geenro serão considerados como <gen:indefinido>; 
// 
// Apesar de ter em mente a noção preliminar de gênero ligado aos nossos conceitos de sexualidade,
// você pode muito bem extende esse conceito e tratar o genero como algo mais abrangente. Como por
// exemplo: 
//                                                      <gen:Humana Mulher>
//                                                      <gen:Elfo Homem>
//                                                      <gen:Anão femea>
//                                                      <gen:Diaba>
//                                                      <gen:Diabo>
//                                                      <gen:Anjo macho>
//                                                      <gen:Slime femea>
//                                                      <gen:Mulher Gato>
//
//
// Somente a sua criatividade é o limite para os tipos de "gênero" que você pode inventar. E não
// se preocupe, o plugin irá reconhecer cada um dos gêneros automáticamente!
//
// Para pegar o gen de um personagem você pode fazer: $gameActors.actor(actorId).codGen();
//                                                    $gameActors.actor(actorId).nameGen();
//
// Caso queira saber o código de um gen: $dataGen.codGen(nameGen); Exemplo: $dataGen.codGen("male");
// caso queira saber o nameGen associado a um codGen: $dataGen(codGen); Exemplo: $dataGen.nameGen(2);
//
// ATENÇÃO: Se um código ou um nome não tiver sido cadastrado apareçerá um alerta de erro.
//
/*:
 * @target MZ
 * @plugindesc permite atribuir "gênero" aos personagens.
 * @author DadoCWB eudado gmail.com
 * 
 *
 * @help POG_RaceAndGender.js
 * Atualizado em 22-09-2020
 *
 * Pode-se atribuir gênero a um personagem. Para isso é preciso usar
 * uma tag no campo "anotações" da aba "Personagens" no Banco de Dados.
 * A tag deve ter o formato: <gen:male>
 *                           <gen:female>
 *                           <gen:trans>
 *                           <gen:lesbian>
  *                          <gen:Mulher>
 *                           <gen:Elfo Macho>
 *                           <gen:Anã>
  *                          <gen:Deusa>
 *                           <gen:Fantasma Macho>
 *                           <gen:Mulher Serpente>
 *
 * Você não precisa se limitar aos exemplos citados acima. Você pode usar 
 * qualquer tag que desejar! O plugin irá identificar quqluer tag que você
 * crie desde que esteja no formato <gen: + palavra + >. 
 *
 * Você não precisa atribuir um gênero a todos os personagens. Aos  
 * personagens que não forem atribuirdos um gênero serão classificados
 * como "indefinido".
 *
 * O plugin irá gerar um código para cada gênero que você criou. Dessa
 * forma você poderá fazer verificações usando um número e não uma string.
 * 
 * 1) hasgen
 * 	  Verificar quantos personagens do grupo são de um determinado gênero:
 *    Você precisa informar: 
 *    a) o codGen que deseja verificar;
 *    b) A variavel do banco de dados que vai receber essa informação 
 *
 *
 * 2) partyNameGen
 *    Verifica o gênero de um membro específico da party. É preciso
 *    informar:
 *	  a) o posição do personagem na party.
 *	  b) a variável que vai receber a resposta (string)
 *
 * 3) partyCodGen
 *    Verifica o gênero de um membro específico da party. É preciso
 *    informar:
 *	  a) o posição do personagem na party.
 *	  b) a variável que vai receber a resposta (numero)
 *
 * 4) toNameGen
 *   Converte um codGen armazenado em um variável no respectivo NameGen. 
 *   Você precisara informar:
 *   a) Variável onde o codGen está armazenada;
 *   b) Variável que recebrá o nameGen;
 *
 * 5) actorNameGen
 *   Pega o nameGen d eum ator qualquer do banco de dados. Vcê precisará informar:
 * 	 a) Id do actor (actorId)
 *	 b) variável que irá armazenar o namseGen
 *
 * 6) actorCodGen
 *   pega o codGen de um ator qualquer do banco de dados. Você precisará informar:
 *   a) Id do actor (actorId)
 *   b) variável do banco de dados que irá receber o codGen
 *
 * @command hasGen
 * @text hasGen
 * @desc Armazena em uma variavel do banco de dados quantos personagens de um determinado genero estão no grupo.
 * 
 * @arg varId
 * @type number
 * @desc Id da variável do Banco de Dados que irá receber o retorno 
 *
 * @arg nameGen
 * @type string
 * desc string contendo o nome do gênero que se deseja verificar
 *
 * -----------------------
 * @command partyNameGen
 * @text (nome) Gen. do Membro
 * @desc retorna para uma variavel do banco de dados o genero de um membro da party.
 * 
 * @arg varId
 * @type number
 * @desc Id da variável do Banco de Dados que irá receber o retorno 
 *
 * @arg partyIndex
 * @type number
 * @desc posição do personagem na party
 *
 * -----------------------
 * @command partyCodGen
 * @text (cod) Gen. do Membro
 * @desc retorna para uma variável do banco de dados o genero de um membro da party.
 * 
 * @arg varId
 * @type number
 * @text variavel p/ código
 * @desc Id da variável para o CÓDIGO 
 *
 * @arg partyIndex
 * @text ID do membro
 * @type number
 * @desc (id) posição do personagem na party  (o líder é o membro zero).
 *
 * -----------------------
 * @command toName
 * @text Codigo=>Nome
 * @desc converte o codigo do genero em NOME e armazena em uma variável.
 * 
 * @arg varCod
 * @type number
 * @text variável do codigo
 * @desc Id da variável que armazena o codigo 
 *
 * @arg varName
 * @text Variavel p/ NOME
 * @type number
 * @desc Id da variável para receber o NOME.
 *
 * -----------------------
 * @command toCod
 * @text Nome=>Codigo
 * @desc Converte o nome do gênero em CODIGO e armazena em uma variável.
 * 
 * @arg varName
 * @type string
 * @text variável do nome
 * @desc Id da variável do Banco de Dados qe armazena o nameGen
*
 * @arg varCod
 * @type number
 * @text variável p/ CÓDIGO
 * @desc Id da variável do Banco de Dados que reeberá o codGen 
 *
 * -----------------------
 * @command actorNameGen
 * @text (nome) Gên. Personagem
 * @desc Armazena em uma variavel o nome do genero de um persnagem do Banco de Dados.
 * 
 * @arg actorId
 * @text Id do Personagem
 * @type number
 * @desc Id do personagem no banco de dados.
 *
 * @arg varId
 * @text Numero da Varável
 * @type number
 * @desc Id da variável do que reeberá o name do gênero
 
 * -----------------------
 * @command actorCodGen
 * @text (cod) Gên. Personagem
 * @desc Armazena em uma variavel o codigo do genero de um personagem do Banco de Dados.
 * 
 * @arg actorId
 * @text Id do Personagem
 * @type number
 * @desc Id do personagem no Bando de Dados.
 * 
 * @arg varId
 * @text Numero da Varável
 * @type number
 * @desc Id da variável do Banco de Dados que reeberá o codGen
 *  
  * -----------------------
 * @command trocarGen
 * @text Trocar Gênero
 * @desc troca o Gênero de um personagem específico.
 * 
 * @arg actorId
 * @text Id do Personagem
 * @type number
 * @desc Id do personagem no Bando de Dados.
 * 
 * @arg nameGen
 * @text Nome do Gênero
 * @type string
 * @desc Nome do "novo" gênero do personagem
 */
(() => {
    const pluginName = "POG_RaceAndGender";

    PluginManager.registerCommand(pluginName, "actorCodGen", args => {
       let actorId 	= Number(args.actorId);
       let varId 	= String(args.varId);
       
       let codGen 	= $gameActors.actor(actorId).codGen()
       $gameVariables.setValue(varId, codGen);
    });

    PluginManager.registerCommand(pluginName, "actorNameGen", args => {
       let actorId 	= Number(args.actorId);
       let varId 	= String(args.varId);

       let nameGen 	= $gameActors.actor(actorId).nameGen()
       $gameVariables.setValue(varId, nameGen);
    });

    PluginManager.registerCommand(pluginName, "toCod", args => {
       let codId 	= Number(args.varCod);
       let nameId 	= String(args.varName);
       
       let nameGen 	= $gameVariables.value(nameId);
       let codGen 	= $dataGen.codGen(nameGen);
       $gameVariables.setValue(codId, codGen);
    });

    PluginManager.registerCommand(pluginName, "toName", args => {
       let codId 	= Number(args.varCod);
       let nameId 	= String(args.varName);
       
       let codGen 	= $gameVariables.value(codId);
       let nameGen 	= $dataGen.nameGen(codGen);
       $gameVariables.setValue(nameId, nameGen);
    });

    PluginManager.registerCommand(pluginName, "partyCodGen", args => {
       let varId 	= Number(args.varId);
       let index 	= String(args.partyIndex);
       let codGen	= $gameParty.codGen(index);
       $gameVariables.setValue(varId, codGen);
    });

    PluginManager.registerCommand(pluginName, "partyNameGen", args => {
       let varId 	= Number(args.varId);
       let index 	= String(args.partyIndex);
       let nameGen 	= $gameParty.nameGen(index);
       $gameVariables.setValue(varId, nameGen);
    });

    PluginManager.registerCommand(pluginName, "hasGen", args => {
       let varId 	= Number(args.varId);
       let nameGen 	= String(args.nameGen);
       let n = $gameParty.hasNameGen(nameGen);
       
       $gameVariables.setValue(varId, n);
    });

    PluginManager.registerCommand(pluginName, "trocarGen", args => {
       let actorId 	= Number(args.actorId);
       let nameGen 	= String(args.nameGen);
       //alert(actorId+","+nameGen+","+codGen);
       	$dataGen.setData(nameGen);
     	let codGen 	= $dataGen.codGen(nameGen);

       let actor 	= $gameActors.actor(actorId).setGen(nameGen, codGen);
    });

 })(); 

var _gen_atributos =  Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
  _gen_atributos.call(this);
  this._codGen 	=null; //contadores para regenerar o mp/hp
  this._nameGen =null; //contadores para regenerar o mp/hp
};

//define ou redefine o gen do personagem
Game_Actor.prototype.setGen=function(nameGen, codGen){
	this._nameGen 	=   nameGen;
	this._codGen 	=	codGen;
};

// Retorna o codigo do gen referente ao personagem
Game_Actor.prototype.codGen=function(){
	return this._codGen;
};
//retorna uma string com o nome do gen do personagem
Game_Actor.prototype.nameGen=function(){
	return this._nameGen;
};

//============================================================================================================================
// DataGen
//============================================================================================================================
function DataGen(){
	this.initialize.apply(this);
}

DataGen.prototype.initialize=function(tag){
	this._tag = tag;
	this._type=["indefinido"];
	this.setup();
};
DataGen.prototype.getAll=function(){
	return this._type;
}

DataGen.prototype.setup=function(){
	var tam = $dataActors.length;
	var i;
	for(i=1; i<tam; i++){
		let actor 	= $gameActors.actor(i);
		let gen 	= this.defineGen(i); 	//name
		let cod 	= this.codGen(gen);		//cod
		actor.setGen(gen,cod);
	}
};

DataGen.prototype.defineGen=function(actorId){
	var note  = $dataActors[actorId].note
	var index = note.indexOf(this._tag);
	var c = index+6;
	var gen="";
	if (note){
		while(note[c]!==">"){
			let p =note[c];
			gen=gen+p;
			c++;
		}
		this.setData(gen); //cadastra o tipo de gen
		return gen;
	}
	return "indefinido";
};

//insere um novo tipo se ele não existir no cadastro 
DataGen.prototype.setData=function(type){
	if(type !=="" && !this.exist(type)){
		this._type.push(type);		
	}
};
//recebe o codigo do gen e retorna uma string contendo o nome do gen
DataGen.prototype.nameGen=function(codigo){
	if(codigo>0 && codigo<this._type.length){
		return this._type[codigo];		
	}else{
		alert("Erro!001: Codigo Inválido");
	}
}
//recebe uma string com o nome do gen e retorna o codigo referente a ele
DataGen.prototype.codGen=function(nameGen){
	var cod = this._type.indexOf(nameGen);
	if (cod>=0){
		return cod;
	}else{
		alert("Erro! gen002: nameGen inválido" );
	}
};

//retorna o array contendo todos os tipos de gen cadastrados
DataGen.prototype.getData=function(){
	return this._type;
}
//verifica se existe ou não o tipo especificado
DataGen.prototype.exist=function(type){
	var i;
	var tam = this._type.length;
	for(i=0; i<tam; i++){
		if (this._type[i]==type){
			return true;
		}
	}
	return false;	
}

//============================================================================================================================
// funções de Plugin
//============================================================================================================================
//verifica quanto personagens de um  genero está presente no grupo
Game_Party.prototype.hasNameGen=function(nameGen){
	var n =0;
	var members = this.members();
	var i;
	for (i=0; i<members.length; i++){
		let actor = members[i];
		if (actor.nameGen()===nameGen){
			n++
		}
	}
	return n;
};
//verifica o gênero de um membro especifico do grupo
Game_Party.prototype.nameGen=function(index){
	let members = this.members();
	let actor 	= members[index];
	return actor.nameGen();
}

//verifica o gênero de um membro especifico do grupo
Game_Party.prototype.codGen=function(index){
	let members = this.members();
	let actor 	= members[index];
	return actor.codGen();
}

//===============================================================================================================================
// DataManager
//===============================================================================================================================
$dataGen=null;
var _dataGen_createGameObjects = DataManager.createGameObjects; 
DataManager.createGameObjects = function() {
	_dataGen_createGameObjects.call(this);

	$dataGen =new DataGen('<gen:');
};