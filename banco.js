<!DOCTYPE html>
<html>
<head>
 <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
 <style class="main_style">
.layout-canvas-g {
  background-color: #fff;
  border: none;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0;
  width: 100%;
}
.layout-canvas-g > .header,
.layout-canvas-g > .section,
.layout-canvas-g > .footer {
  position: relative;
  overflow: hidden;
  width: 100%;
  word-wrap: break-word;
}
.layout-canvas-g > .section {
  margin: 10px 0;
}
.layout-canvas-g > .section > .columns {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  word-wrap: break-word;
}
body {
  color: #000;
  font-family: Arial;
  font-size: 12px;
  margin: 0 auto;
  max-width: 1280px;
}
@media only screen and (max-width: 480px) {
  .mobile-hidden {
    display: none !important;
  }
  .responsive-td {
    width: 100% !important;
    display: block !important;
    padding: 0 !important;
  }
}
.layout-canvas-g > .section > .columns {
  width: 100%;
}

</style>

</head>
<body>
<script runat="server">
    Platform.Load("core", "1");

    var debug = false;
    var request = {};
  
    SetVar("method", Request.Method)
    SetVar("urlThis", Platform.Request.RequestURL);
    SetVar("MasterDEKey", "DEX_CENTRAL_PREFERENCIAS");
    SetVar("HistoricoDEKey", "HISTORICO_CENTRAL_PREFERENCIAS");
    SetVar("JobID", Attribute.GetValue("jobid"));
    SetVar("BatchID", Attribute.GetValue("_JobSubscriberBatchID"));
    SetVar("ListID", Attribute.GetValue("ListID"));
    SetVar("debug", debug);
    SetVar("formDescricao", Request.GetFormField("formDescricao"));

    //create GMT -3 datetime
    var agora = new Date();
    var fusoHorario = 3; // GMT-3
    var agoraGmt3 = agora.setHours(agora.getHours() + fusoHorario)
     
    // Se for GET é o clique no email
    if (request.method == "GET") 
    {
      
        if (debug) {
            Write("GET<br>");
        }

        // Busca SubscriberKey a partir das informações de envio
        SetVar("SubscriberKey", Attribute.GetValue("_SubscriberKey"));
        SetVar("Email", Attribute.GetValue("emailaddr"));

        if (request.SubscriberKey != "") {

          // Busca linhas da DE de preferencias
          var masterRows = Platform.Function.LookupRows(request.MasterDEKey,['ContactKey'], [request.SubscriberKey]);

          if (debug) {
            Write("<br>masterRows.length: " + masterRows.length);
            Write("<br>masterRows: " + Stringify(masterRows));
          }

          // Variáveis para os nomes das colunas
          if (typeof masterRows !== 'undefined' &&  masterRows.length > 0) 
          {
            // Nomes dos campos são case sensitive
            SetVar("ContactKey", masterRows[0]["ContactKey"]);
            SetVar("Email", masterRows[0]["Email"]);
            SetVar("pref_email_ofertas", masterRows[0]["pref_email_ofertas"]);
            SetVar("pref_email_convites", masterRows[0]["pref_email_convites"]);
            SetVar("pref_email_oportunidades", masterRows[0]["pref_email_oportunidades"]);
            SetVar("pref_email_lancamentos", masterRows[0]["pref_email_lancamentos"]);
            SetVar("pref_email_pesquisas", masterRows[0]["pref_email_pesquisas"]);
            SetVar("pref_sms_ofertas", masterRows[0]["pref_sms_ofertas"]);
            SetVar("pref_sms_convites", masterRows[0]["pref_sms_convites"]);
            SetVar("pref_sms_oportunidades", masterRows[0]["pref_sms_oportunidades"]);
            SetVar("pref_sms_lancamentos", masterRows[0]["pref_sms_lancamentos"]);
            SetVar("pref_sms_pesquisas", masterRows[0]["pref_sms_pesquisas"]);
            

          }

        }
    // Se for post é o update
    } 
    else if (request.method == "POST" && request.formDescricao == "false") {

        if (debug) {
            Write("GET<br>");
        }

        // Busca SubscriberKey a partir das informações de envio
        SetVar("SubscriberKey", Attribute.GetValue("_SubscriberKey"));
        SetVar("Email", Attribute.GetValue("emailaddr"));


        if (debug) {
            Write("POST<br>");
        }

        // Busca valores do elemento form
        SetVar("ContactKey", Request.GetFormField("ContactKey"));
        SetVar("Email", Request.GetFormField("Email"));

        // Fallback se o SubscriberKey estiver em branco
        if (request.SubscriberKey == "") {
            SetVar("ContactKey", Request.GetFormField("Email"));
        }

        // Busca valores do submit (case-sensitive)
        SetVar("Email", Request.GetFormField("Email"));
        //ofertas
        if (Request.GetFormField("pref_email_ofertas") == "on") {
         SetVar("pref_email_ofertas", "true");
        } else {
          SetVar("pref_email_ofertas", "false");
        }
        if (Request.GetFormField("pref_sms_ofertas") == "on") {
          SetVar("pref_sms_ofertas", "true");
        } else {
          SetVar("pref_sms_ofertas", "false");
        }
        //convites
        if (Request.GetFormField("pref_email_convites") == "on") {
         SetVar("pref_email_convites", "true");
        } else {
          SetVar("pref_email_convites", "false");
        }
        if (Request.GetFormField("pref_sms_convites") == "on") {
          SetVar("pref_sms_convites", "true");
        } else {
          SetVar("pref_sms_convites", "false");
        }
        //oportunidades
        if (Request.GetFormField("pref_email_oportunidades") == "on") {
         SetVar("pref_email_oportunidades", "true");
        } else {
          SetVar("pref_email_oportunidades", "false");
        }
        if (Request.GetFormField("pref_sms_oportunidades") == "on") {
          SetVar("pref_sms_oportunidades", "true");
        } else {
          SetVar("pref_sms_oportunidades", "false");
        }
        //lancamentos
        if (Request.GetFormField("pref_email_lancamentos") == "on") {
         SetVar("pref_email_lancamentos", "true");
        } else {
          SetVar("pref_email_lancamentos", "false");
        }
        if (Request.GetFormField("pref_sms_lancamentos") == "on") {
          SetVar("pref_sms_lancamentos", "true");
        } else {
          SetVar("pref_sms_lancamentos", "false");
        }
        //pesquisas
        if (Request.GetFormField("pref_email_pesquisas") == "on") {
         SetVar("pref_email_pesquisas", "true");
        } else {
          SetVar("pref_email_pesquisas", "false");
        }
        if (Request.GetFormField("pref_sms_pesquisas") == "on") {
          SetVar("pref_sms_pesquisas", "true");
        } else {
          SetVar("pref_sms_pesquisas", "false");
        }

        if (request.SubscriberKey != "") {

          try {

              // set values for Subscriber update
              var sub = {
                     "SubscriberKey": request.SubscriberKey
                   , "Status" : "Active"
              };

              // initialize the Subscriber object
              var subObj = Subscriber.Init(request.SubscriberKey);

              // add/update the Subscriber
              SetVar("subscriberUpsertResults", subObj.Upsert(sub));

              // upsert a row in the Master Data Extension
              var de = DataExtension.Init(request.MasterDEKey);

              var row = {};
              row.ContactKey = request.ContactKey;
              row.Email = request.Email;
              row.UltimaModificacao = agoraGmt3;
              row.pref_email_ofertas = request.pref_email_ofertas;
              row.pref_sms_ofertas = request.pref_sms_ofertas;
              row.pref_email_convites = request.pref_email_convites;
              row.pref_sms_convites = request.pref_sms_convites;
              row.pref_email_oportunidades = request.pref_email_oportunidades;
              row.pref_sms_oportunidades = request.pref_sms_oportunidades;
              row.pref_email_lancamentos = request.pref_email_lancamentos;
              row.pref_sms_lancamentos = request.pref_sms_lancamentos;
              row.pref_email_pesquisas = request.pref_email_pesquisas;
              row.pref_sms_pesquisas = request.pref_sms_pesquisas;
              

              if (debug) {
                Write("<br><br>DE row: " + Stringify(row));
              }

              try {

                // attempt to add a row
                SetVar("rowAddResults", de.Rows.Add(row));

              } catch (e1) {

                 if (debug) {
                   Write("<br><br>Exception (1): " + e1);
                 }

                 try {

                    SetVar("rowUpdateResults", de.Rows.Update(row, ['ContactKey'], [request.ContactKey]));

                 } catch (e2) {

                    if (debug) {
                     Write("<br><br>Exception (2): " + e2 + " " + Stringify(request));
                    }

                 }
              }

              SetVar("overallResult", "success");

          } catch(e3) {
              SetVar("overallResult", "error");

          }

        } // EmailAddress check

    }
    else if (request.method == "POST" && request.formDescricao == "true")
    {
        // Busca valores do elemento form
        SetVar("ContactKey", Request.GetFormField("ContactKey"));

        // Fallback se o SubscriberKey estiver em branco
        if (request.SubscriberKey == "") {
            SetVar("ContactKey", Request.GetFormField("Email"));
        }

        //Opt-out?
        SetVar("OptOut", Request.GetFormField("optout"));

        // Busca valores do submit (case-sensitive)

        if (request.SubscriberKey != "") 
        {
            if(request.OptOut != "on")
            {
                try 
                {
                    SetVar("pref_descricao", Request.GetFormField("pref_descricao"));

                    SetVar("pref_fontes", Request.GetFormField("pref_fontes"));
                    SetVar("pref_relevantes", Request.GetFormField("pref_relevantes"));
                    SetVar("pref_frequencia", Request.GetFormField("pref_frequencia"));

                    if (Request.GetFormField("pref_fontes") == "on") 
                    {
                        SetVar("pref_fontes", "true");
                    } 
                    else 
                    {
                        SetVar("pref_fontes", "false");
                    }
                    if (Request.GetFormField("pref_relevantes") == "on") {
                        SetVar("pref_relevantes", "true");
                    } 
                    else 
                    {
                        SetVar("pref_relevantes", "false");
                    }
                    //pesquisas
                    if (Request.GetFormField("pref_frequencia") == "on") {
                        SetVar("pref_frequencia", "true");
                    } 
                    else 
                    {
                        SetVar("pref_frequencia", "false");
                    }


                    // upsert a row in the Master Data Extension
                    var de = DataExtension.Init(request.MasterDEKey);

                    var row = {};
                    row.ContactKey = request.ContactKey;
                    row.UltimaModificacao = agoraGmt3;
                    row.pref_descricao = request.pref_descricao;
                    row.pref_fontes = request.pref_fontes;
                    row.pref_relevantes = request.pref_relevantes;
                    row.pref_frequencia = request.pref_frequencia;

                    if (debug) 
                    {
                        Write("<br><br>DE row: " + Stringify(row));
                    }

                    try 
                    {

                        // attempt to add a row
                        SetVar("rowAddResults", de.Rows.Add(row));

                    } 
                    catch (e4) 
                    {
                         if (debug) 
                         {
                            Write("<br><br>Exception (4): " + e4);
                         }

                         try 
                         {
                            SetVar("rowUpdateResults", de.Rows.Update(row, ['ContactKey'], [request.ContactKey]));

                            try 
                            {
                                // Define o filtro que você deseja usar para recuperar o registro específico
                                var filter = {
                                    Property: "ContactKey",
                                    SimpleOperator: "equals",
                                    Value: request.ContactKey
                                };
                                
                                // Recupera o registro específico da Data Extension origem
                                var reg = Platform.Function.LookupRows(request.MasterDEKey,['ContactKey'], [request.ContactKey]);
                                
                                
                                // Verifica se o registro foi encontrado
                                if (reg.length > 0) {

                                    var rowHistorico = {};

                                    rowHistorico.ContactKey = reg[0].ContactKey;
                                    rowHistorico.Email = reg[0].Email;
                                    rowHistorico.UltimaModificacao = reg[0].UltimaModificacao;
                                    rowHistorico.pref_email_ofertas = reg[0].pref_email_ofertas;
                                    rowHistorico.pref_sms_ofertas = reg[0].pref_sms_ofertas;
                                    rowHistorico.pref_email_convites = reg[0].pref_email_convites;
                                    rowHistorico.pref_sms_convites = reg[0].pref_sms_convites;
                                    rowHistorico.pref_email_oportunidades = reg[0].pref_email_oportunidades;
                                    rowHistorico.pref_sms_oportunidades = reg[0].pref_sms_oportunidades;
                                    rowHistorico.pref_email_lancamentos = reg[0].pref_email_lancamentos;
                                    rowHistorico.pref_sms_lancamentos = reg[0].pref_sms_lancamentos;
                                    rowHistorico.pref_email_pesquisas = reg[0].pref_email_pesquisas;
                                    rowHistorico.pref_sms_pesquisas = reg[0].pref_sms_pesquisas;
                                    rowHistorico.pref_descricao = reg[0].pref_descricao;
                                    rowHistorico.pref_fontes = reg[0].pref_fontes;
                                    rowHistorico.pref_relevantes = reg[0].pref_relevantes;
                                    rowHistorico.pref_frequencia = reg[0].pref_frequencia;

                                    // Define o objeto Data Extension destino
                                    var deHistorico = DataExtension.Init(request.HistoricoDEKey);

                                    // Insere o registro na Data Extension destino
                                    var result = deHistorico.Rows.Add(rowHistorico);
                                    if (result) {
                                        SetVar("overallResult", "success");
                                    } else {
                                        SetVar("overallResult", "error");
                                    }
                                } else 
                                {
                                    SetVar("overallResult", "error");
                                }
                            }
                            catch (e5) 
                            {
                                if (debug) 
                                {
                                    Write("<br><br>Exception (5): " + request.HistoricoDEKey);
                                }
                            }
                         }
                         catch (e6) 
                         {

                            if (debug) 
                            {
                                Write("<br><br>Exception (6): " + e6 + " " + Stringify(request));
                            }
                         }
                    }
                    SetVar("overallResult", "success");
                }
                catch(e6) 
                {
                    SetVar("overallResult", "error");
                }
            }
            else
            {
                try
                {
                    var unsubDE = DataExtension.Init("LogUnsubEvent");

                    var unsubRecord = { // create data extension row object
                        SubscriberKey: request.ContactKey,
                        EventDate: new Date(),
                        Channel: "Email",
                        Reason: "One-Click Unsubscribe",
                        JobID: request.JobID,
                        BatchID: request.BatchID,
                        ListID: request.ListID
                    };

                    var rowOptOutCompleto = {};

                    rowOptOutCompleto.ContactKey = reg[0].ContactKey;
                    rowOptOutCompleto.Email = reg[0].Email;
                    rowOptOutCompleto.UltimaModificacao = reg[0].UltimaModificacao;
                    rowOptOutCompleto.pref_email_ofertas = false;
                    rowOptOutCompleto.pref_sms_ofertas = false;
                    rowOptOutCompleto.pref_email_convites = false;
                    rowOptOutCompleto.pref_sms_convites = false;
                    rowOptOutCompleto.pref_email_oportunidades = false;
                    rowOptOutCompleto.pref_sms_oportunidades = false;
                    rowOptOutCompleto.pref_email_lancamentos = false;
                    rowOptOutCompleto.pref_sms_lancamentos = false;
                    rowOptOutCompleto.pref_email_pesquisas = false;
                    rowOptOutCompleto.pref_sms_pesquisas = false;

                    SetVar("rowUpdateResults", de.Rows.Update(row, ['ContactKey'], [request.ContactKey]));
                    SetVar("rowOptOutResults", unsubDE.Rows.Update(unsubRecord, ['ContactKey'], [request.ContactKey]));
                }
                catch (e7) 
                {
                    if (debug) 
                    {
                        Write("<br><br>Exception (7): " + e7);
                    }

                    SetVar("overallResult", "error");
                }

            }
        }

    } // POST
    else
    {
      SetVar("overallResult", "error");
    }

    // sets JS and AMPScript variables
    function SetVar(varName, varValue){
        request[varName] = varValue;
        Variable.SetValue(varName, varValue);
    }

    if (debug) {
        Write("<br><br>" + Stringify(request) + "<br><br>");
    }
</script>


    
        <title>Central de Preferências</title>
    
      <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;700;800&amp;display=swap" rel="stylesheet">
   
<!-- CSS GERAL -->

<style>
#title_logo{
           font-family: "Open Sans";
           font-size:18px !important; 
           font-weight: 500 !important;
           padding:20px 0 24px 30px !important;
      }
        
    .title_comunica{
           background-color: #F2F3F3;
           margin: 120px 0 140px 120px !important;
           
}
    .title_comunica td {
           background-color: #F2F3F3;
           font-family: "Open Sans";
            font-size:12px !important;
            font-weight: 400 !important;
           
     }

.container {
  max-width: 70vw;
  margin: 0 auto;
  font-family: "Open Sans";
  font-weight: 500;
  font-size: 1em;
  line-height: 24px;
  color: #09121c;
  padding: 30px 0 0 30px;
}
     

.container p{
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 140%;
}

      fieldset {
        border: 0;
        padding:0;
        margin:0;
      }

      hr {
  margin: 40px 0 0 0;
}
      

   .checkbox {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  text-align:right;
  
  }

    input[type='checkbox'] {
    accent-color: #000;
    width: 18px;
    height:18px;
}

   button { 
    font-family: "Open Sans";
    float:right;
    padding: 16px !important;
    border-style: none;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    padding: 10px;
    border-radius: 4px;
    color: #fff;
    background: #1E1E1E;
    margin: 29.5px auto;
    -webkit-box-shadow: 0 10px 20px 0 rgb(106 108 117 / 30%);
    box-shadow: 0 10px 20px 0 rgb(106 108 117 / 30%);
    cursor:pointer;
  }
   
  button[disabled] {
  padding: 16px;
  cursor: not-allowed;
  background: #B5B8BB;
  border-radius: 4px;

}

  .cat_ofertas{
            font-family: 'Open Sans';
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 140%;
width: 1111px;
        }

         .cat_ofertas span{
           font-family: 'Open Sans';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 140%;
        }

         .cat_comunica{
            font-family: 'Open Sans';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 150%;
width: 1111px;
        }

          .cat_comunica span{
           font-family: 'Open Sans';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 140%;
        }

           

 table {
        width:100%
      }
   
 fieldset {
        border: 0;
        padding:0;
        margin:0;
      }

 hr {
  margin: 30px 0 0 0;
}
      

 .checkbox2 {
  position: relative;
  display: inline-block;
  width: 10px;
  height: 34px;
  text-align:right;
  
  }
   
.title_opnion{
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        width: 1111px;
         text-align:left;
        }

.title_comunica2{
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 140%;
         text-align:left;
        }

.title_comunica2 span{
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 140%;
        text-align:left;
        }



textarea {
    font-size: 16px;
    font-family: 'Open Sans';
    padding: 10px;
    max-width: 100%;
    line-height: 1.5;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px #999;
    resize: none;

}

.outro_motivo {
    display: block;
    margin-bottom: 10px;
    }

#btn { 
    border: 1px solid black;
    background-color: white;
    font-family: 'Open Sans';
    font-size: 16px !important;
    float:left;
    padding: 16px !important;
    text-align: center;
    border-radius: 4px;
    color: black;
    margin: 10px 0 50px 0;
    cursor:pointer;
    
  }
   
#btn[disabled] {
  padding: 16px;
  cursor: not-allowed;
  background: #FFFFFF;
  border-radius: 4px;
  opacity: 0.3;

}
 

.opcao{
        font-family: 'Open Sans';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 150%;
color: #09121C;

    }

.alerta {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 100%;
 padding: 16px 0 16px 16px;
 border: 1px solid gray;
 border-radius: 3px;
 margin: 10px 0 10px 0;
}
              .sucesso {
                  border-color: #E1F3ED;
                  color: #09121C;
                  background-color: #E1F3ED;
              }

              .topico-selecionado
              {
                opacity:1.0;
              }

              .item-selecionado
              {
                opacity:1.0;
              }

              .topico-deselecionado
              {
                opacity:.3;
              }

              .item-deselecionado
              {
                opacity:0.3;
              }
</style>

<div style="background-color:#070708;">
    <div class="container">
        <a><img src="https://global-uploads.webflow.com/5f184d1fba281719ebfcc1a1/60895f4c86055d31ccd5ae59_negative.png" loading="lazy" width="42" height="35" alt="Banco ABC Brasil">
        </a></div>
        <div id="title_logo" class="container" style="color:#fff; padding: 0 0 10px 0;" onclick="">
            <span>Central de preferências</span>
        </div>
    </div>
    %%[ if @method == "GET" then ]%%
    <div class="container">
        <p>Escolha as comunicações que você quer receber</p>
    </div>
    
    <div class="container">
        <form method="post" action="%%=v(@urlThis)=%%" enctype="application/x-www-form-urlencoded">
    <fieldset>
        <input type="hidden" name="ContactKey" value="%%=v(@SubscriberKey)=%%">
        <input type="hidden" name="Email" value="%%=v(@Email)=%%">
        <input type="hidden" name="formDescricao" value="false">
        <table>
            <tr>
                <td class="auto-style1">&nbsp;</td>
            </tr>
            <tr>
                <td class="cat_ofertas">Ofertas e recomendações<br>
                    <span>Quero receber comunicações sobre ofertas e recomendações de produtos e serviços.</span>
                </td>
                <td>
                    <label class="checkbox">
                        <input type="checkbox" name="check1" id="ofertas" class="topico">
                    </label>
                </td>
            </tr>
            <tr>
                <td class="auto-style1">&nbsp;</td>
            </tr>
            <tr class="title_comunica">
                <td style="text-align:left; padding:9px;" class="auto-style1">Comunicações</td>
                <td style="text-align:right; padding:9px;">E-mail</td>
            </tr>
            <tr>
                <td class="auto-style1">&nbsp;</td>
            </tr>
            <tr>
                <td id="ofertas1-td" class="cat_comunica">Ofertas de produtos e serviços de acordo com seu perfil<br>
                    <span>Conheça nossas ofertas baseadas no seu perfil.</span>
                </td>
                <td>
                    <label class="checkbox">
                        <input type="checkbox" %%[ if @pref_email_ofertas == false then ]%% %%[ else ]%% checked="" %%[ endif ]%% name="pref_email_ofertas" id="ofertas1" class="ofertas">
                    </label>
                </td>
            </tr>
        </table>
        <hr>
        <table>
            <tr>
                <td class="auto-style1">&nbsp;</td>
            </tr>
            <tr>
                <td class="cat_ofertas">Notícias e atualizações<br>
                    <span>Quero receber comunicações sobre o mercado financeiro e atualizações do Banco ABC Brasil.</span>
                </td>
                <td>
                    <label class="checkbox">
                        <input type="checkbox" id="comunicacoes" class="topico">
                    </label>
                </td>
            </tr>
            <tr>
                <td class="auto-style1">&nbsp;</td>
            </tr>
            <tr class="title_comunica">
                <td style="text-align:left; padding:9px;" class="auto-style1">Comunicações</td>
                <td style="text-align:right; padding:9px;">E-mail</td>
            </tr>
            <tr>
                <td class="auto-style1">&nbsp;</td>
            </tr>
            <tr>
                <td id="noticias1-td" class="cat_comunica">Oportunidades e notícias sobre o mercado financeiro<br>
                    <span>Notícias e informações sobre as mais importantes movimentações de mercado.</span>
                </td>
                
                <td>
                    <label class="checkbox">
                        <input class="comunicacoes" type="checkbox" %%[ if @pref_email_oportunidades == false then ]%% %%[ else ]%% checked="" %%[ endif ]%% name="pref_email_oportunidades" id="noticias1">
                    </label>
                </td>
            </tr>
            <tr>
                <td class="auto-style1">&nbsp;</td>
            </tr>
            <tr>
                <td id="noticias2-td" class="cat_comunica">Nossos lançamentos e novas informações<br>
                    <span>Fique por dentro de nossos lançamentos, notícias e informações.</span>
                </td>
                <td>
                    <label class="checkbox">
                        <input class="comunicacoes" type="checkbox" %%[ if @pref_email_lancamentos == false then ]%% %%[ else ]%% checked="" %%[ endif ]%% name="pref_email_lancamentos" id="noticias2">
                    </label>
                </td>
            </tr>
        </table>        
        <hr>      
        <table>
            <tr>
                <td class="auto-style1">&nbsp;</td>
            </tr>
            <tr>
                <td class="cat_ofertas">Relacionamento<br>
                    <span>Quero receber comunicações sobre relacionamento.</span>
                </td>
                <td>
                    <label class="checkbox">
                        <input type="checkbox" name="check3" id="relacionamento" class="topico">
                    </label>
                </td>
            </tr>
            <tr>
                <td class="auto-style1">&nbsp;</td>
            </tr>
            <tr class="title_comunica">
                <td style="text-align:left; padding:9px;" class="auto-style1">Comunicações</td>
                <td style="text-align:right; padding:9px;">E-mail</td>
            </tr>
            <tr>
                <td class="auto-style1">&nbsp;</td>
            </tr>
            <tr>
                <td id="rel_1-td" class="cat_comunica">Convites para eventos presenciais e on-line<br>
                    <span>Convite e lembretes para eventos exclusivos.</span>
                </td>
                
                <td>
                    <label class="checkbox">
                        <input type="checkbox" %%[ if @pref_email_convites == false then ]%% %%[ else ]%% checked="" %%[ endif ]%% name="pref_email_convites" id="rel_1" class="relacionamento">
                    </label>
                </td>
            </tr>
            <tr>
                <td class="auto-style1">&nbsp;</td>
            </tr>
            <tr>
                <td id="rel_2-td" class="cat_comunica">Pesquisas<br>
                    <span>Como podemos melhorar nossos serviços e sua experiência.</span>
                </td>
                <td>
                    <label class="checkbox">
                        <input type="checkbox" %%[ if @pref_email_pesquisas == false then ]%% %%[ else ]%% checked="" %%[ endif ]%% name="pref_email_pesquisas" id="rel_2" class="relacionamento">
                    </label>
                </td>
            </tr>
        </table>
        <hr>
        <table>
            <tr>
                <td class="auto-style1">&nbsp;</td>
            </tr>
            <tr>
                <td class="cat_ofertas">Não quero receber comunicações<br>
                    <span>Ao se descadastrar, você continuará recebendo informações transacionais sobre sua conta.</span>
                </td>
                <td>
                    <label class="checkbox">
                        <input type="checkbox" id="optout" onclick="clickOptOut()">
                    </label>
                </td>
            </tr>
            
        </table>
        <div class="container">
            <div class="container" style="text-align:center;">
                <button id="button" type="submit">Salvar</button>
            </div>
        </div>
    </fieldset>
</form>

    </div>
    <script>
    var checkboxes_filhos;
    const checkboxes_topicos = document.querySelectorAll('.topico');
    btnOptOut = document.getElementById('optout');

    btnOptOut.checked = false;
    btnOptOut.parentNode.parentNode.parentNode.classList.add("topico-deselecionado");
    btnOptOut.parentNode.parentNode.parentNode.classList.remove("topico-selecionado");

    var backup_optout_fields = [];
    var backup_optout_content = [];
    var backup_optout_istopico = [];

    Array.from(checkboxes_topicos).forEach(function(topico) 
    {
        topico.addEventListener('click', function() 
        {
            checkboxes_filhos = document.getElementsByClassName(topico.id);
            Array.from(checkboxes_filhos).forEach(function(filho) 
            {
                if (topico.checked)
                {
                    filho.checked = true;
                    filho.parentNode.parentNode.parentNode.classList.add("item-selecionado");
                    filho.parentNode.parentNode.parentNode.classList.remove("item-deselecionado");

                    topico.parentNode.parentNode.parentNode.classList.add("topico-selecionado");
                    topico.parentNode.parentNode.parentNode.classList.remove("topico-deselecionado")
                }
                else
                {
                    filho.checked = false;
                    filho.parentNode.parentNode.parentNode.classList.add("item-deselecionado");
                    filho.parentNode.parentNode.parentNode.classList.remove("item-selecionado");

                    topico.parentNode.parentNode.parentNode.classList.add("topico-deselecionado");
                    topico.parentNode.parentNode.parentNode.classList.remove("topico-selecionado");
                }
            });

            OptOut()
        });

        checkboxes_filhos = document.getElementsByClassName(topico.id);
        Array.from(checkboxes_filhos).forEach(function(filho) 
        {
            filho.addEventListener('click', function() 
            {
                let todosMarcados = true;
                const checkboxes_irmaos = document.getElementsByClassName(topico.id);
                
                Array.from(checkboxes_irmaos).forEach(function(irmao) 
                {
                    if (!irmao.checked) 
                    {
                        todosMarcados = false;
                    } 
                });

                if (todosMarcados) 
                {
                    topico.checked = true;
                    topico.parentNode.parentNode.parentNode.classList.add("topico-selecionado");
                    topico.parentNode.parentNode.parentNode.classList.remove("topico-deselecionado")
                } 
                else
                {
                    topico.checked = false;
                    topico.parentNode.parentNode.parentNode.classList.add("topico-deselecionado");
                    topico.parentNode.parentNode.parentNode.classList.remove("topico-selecionado")
                }


                OptOut()
            });

            let todosMarcados = true;
            const checkboxes_irmaos = document.getElementsByClassName(topico.id);
            
            Array.from(checkboxes_irmaos).forEach(function(irmao) 
            {
                if (!irmao.checked) 
                {
                    todosMarcados = false;

                    filho.parentNode.parentNode.parentNode.classList.add("item-deselecionado");
                    filho.parentNode.parentNode.parentNode.classList.remove("item-selecionado");
                }
                else
                {
                    filho.parentNode.parentNode.parentNode.classList.add("item-selecionado");
                    filho.parentNode.parentNode.parentNode.classList.remove("item-deselecionado");                    
                }
            });

            if (todosMarcados) 
            {
                topico.checked = true;
                topico.parentNode.parentNode.parentNode.classList.add("topico-selecionado");
                topico.parentNode.parentNode.parentNode.classList.remove("topico-deselecionado")
            } 
            else
            {
                topico.checked = false;
                topico.parentNode.parentNode.parentNode.classList.add("topico-deselecionado");
                topico.parentNode.parentNode.parentNode.classList.remove("topico-selecionado")
            }
        });
    });  

    OptOut()

    function OptOut()
    {
        let todosDesmarcados = true;

        let checkboxes_topicos = document.querySelectorAll('.topico')
        Array.from(checkboxes_topicos).forEach(function(topico) 
        {
            checkboxes_filhos = document.getElementsByClassName(topico.id);
            Array.from(checkboxes_filhos).forEach(function(filho) 
            {
                if (filho.checked) 
                {
                    todosDesmarcados = false;

                    filho.parentNode.parentNode.parentNode.classList.add("item-selecionado");
                    filho.parentNode.parentNode.parentNode.classList.remove("item-deselecionado");
                }
                else
                {
                    filho.parentNode.parentNode.parentNode.classList.add("item-deselecionado");
                    filho.parentNode.parentNode.parentNode.classList.remove("item-selecionado");                    
                }
            });
        });


        if (todosDesmarcados)
        {  
            
            btnOptOut.checked = true

            btnOptOut.parentNode.parentNode.parentNode.classList.add("topico-selecionado");
            btnOptOut.parentNode.parentNode.parentNode.classList.remove("topico-deselecionado");
        }
        else
        {   
            btnOptOut.checked = false
            
            btnOptOut.parentNode.parentNode.parentNode.classList.add("topico-deselecionado");
            btnOptOut.parentNode.parentNode.parentNode.classList.remove("topico-selecionado");
        }

    }    
  
    function clickOptOut()
    {
        let checkboxes_topicos = document.querySelectorAll('.topico')

        if (btnOptOut.checked)
        {
            btnOptOut.parentNode.parentNode.parentNode.classList.add("topico-selecionado");
            btnOptOut.parentNode.parentNode.parentNode.classList.remove("topico-deselecionado");
            document.getElementById('button').disabled = false;

            Array.from(checkboxes_topicos).forEach(function(topico) 
            {
                backup_optout_fields.push(topico.id);
                backup_optout_content.push(topico.checked);
                backup_optout_istopico.push(true);
                
                topico.checked = false
                topico.parentNode.parentNode.parentNode.classList.add("topico-deselecionado");
                topico.parentNode.parentNode.parentNode.classList.remove("topico-selecionado");

                checkboxes_filhos = document.getElementsByClassName(topico.id);
                Array.from(checkboxes_filhos).forEach(function(filho) 
                {
                    backup_optout_fields.push(filho.id);
                    backup_optout_content.push(filho.checked);
                    backup_optout_istopico.push(false);

                    filho.checked = false;
                    filho.parentNode.parentNode.parentNode.classList.add("item-deselecionado");
                    filho.parentNode.parentNode.parentNode.classList.remove("item-selecionado");

                });
            });

        }
        else
        {
            btnOptOut.parentNode.parentNode.parentNode.classList.add("topico-deselecionado");
            btnOptOut.parentNode.parentNode.parentNode.classList.remove("topico-selecionado");

            let todosDesmarcados = true;

            backup_optout_fields.forEach((field, index) => {

                var objField = document.getElementById(field)
                objField.checked = backup_optout_content[index];

                if (backup_optout_istopico[index])
                {
                    if (backup_optout_content[index]) 
                    {
                        objField.parentNode.parentNode.parentNode.classList.add("topico-selecionado");
                        objField.parentNode.parentNode.parentNode.classList.remove("topico-deselecionado");
                    }
                    else
                    {
                        objField.parentNode.parentNode.parentNode.classList.add("topico-deselecionado");
                        objField.parentNode.parentNode.parentNode.classList.remove("topico-selecionado");
                    }
                }
                else
                {
                    if (backup_optout_content[index]) 
                    {
                        objField.parentNode.parentNode.parentNode.classList.add("item-selecionado");
                        objField.parentNode.parentNode.parentNode.classList.remove("item-deselecionado");
                    }
                    else
                    {
                        objField.parentNode.parentNode.parentNode.classList.add("item-deselecionado");
                        objField.parentNode.parentNode.parentNode.classList.remove("item-selecionado");
                    }
                }
            });


            backup_optout_fields.length = 0;
            backup_optout_content.length = 0;

            Array.from(checkboxes_topicos).forEach(function(topico) 
            {
                checkboxes_filhos = document.getElementsByClassName(topico.id);
                Array.from(checkboxes_filhos).forEach(function(filho) 
                {
                    if (filho.checked) 
                    {
                        todosDesmarcados = false;

                        filho.parentNode.parentNode.parentNode.classList.add("item-selecionado");
                        filho.parentNode.parentNode.parentNode.classList.remove("item-deselecionado");
                    }
                    else
                    {
                        filho.parentNode.parentNode.parentNode.classList.add("item-deselecionado");
                        filho.parentNode.parentNode.parentNode.classList.remove("item-selecionado");                    
                    }

                });
            });

            if(todosDesmarcados)
            {
                document.getElementById('button').disabled = true; 
            }
        }

    }
</script>
    <!-- Página de Opinião 1 -->
    %%[ elseif @method == "POST" then ]%%
    %%[ if @overallResult == "success" then ]%%
    %%[ if @formDescricao == "false" then ]%%

    <div class="container">
        <table class="alerta sucesso">
            <tr>
                <td style="width: 70px;"><img src="https://image.banco.abcbrasil.com.br/lib/fe2b117171640579711c79/m/1/verificado_CP_azul.jpg" style="height: 60px; width: 60px;"></td>
                <td>Preferências salvas com sucesso.</td>
            </tr>
        </table>
        <div style="line-height:19.6px;">Para voltar a receber esse conteúdo, basta selecionar o tema novamente na <a href="javascript:history.back()" style="color:#000" ;=""> <strong>lista de opções</strong></a> da Central de preferências.</div>
    </div>
    <hr>
    <div class="container">
        <p class="title_comunica2">Sua opinião é valiosa
            <br><span>Ajude a gente a melhorar nossas comunicações.</span></p><br>
            <p class="title_opnion">Por que você não quer mais receber nossas comunicações?</p>
        </div>
        <div class="container">
            <form method="post" action="%%=v(@urlThis)=%%" enctype="application/x-www-form-urlencoded" onchange="formOpinioes()">
                <fieldset>
                <input type="hidden" name="ContactKey" value="%%=v(@SubscriberKey)=%%">
                <input type="hidden" name="Email" value="%%=v(@Email)=%%">
                <input type="hidden" name="formDescricao" value="true">
                    <table>
                        <tr>
                            <td class="checkbox2">
                                <label class="checkbox2">
                                    <input type="checkbox" name="pref_frequencia" id="pref_frequencia">
                                </label>
                            </td>
                            <td class="opcao"><span>Frequência das comunicações é muito alta</span> <br>
                        </td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td class="checkbox2">
                            <label class="checkbox2">
                                <input type="checkbox" name="pref_relevantes" id="pref_relevantes">
                            </label>
                        </td>
                        <td class="opcao"><span>Os temas não são relevantes para mim</span> <br>
                    </td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td class="checkbox2">
                        <label class="checkbox2">
                            <input type="checkbox" name="pref_fontes" id="pref_fontes">
                        </label>
                    </td>
                    <td class="opcao"><span>Já utilizo outras fontes de informação</span> <br>
                </td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
        </table>
    </fieldset>
    <table>
        <tr>
            <td>
                <label class="outro_motivo">Outro motivo (opcional):</label>
                <textarea rows="3" cols="53" name="pref_descricao" id="pref_descricao"></textarea>
            </td>
            <td>
            </td>
            
        </tr>
        <tr>
            <td>
                <button id="btn" type="submit" disabled="true">Responder</button>
               
            </td>
        </tr>
    </table>
</form>

</div>
<script>
function formOpinioes()
{
    var pref_frequencia = document.getElementById('pref_frequencia').checked
    var pref_relevantes = document.getElementById('pref_relevantes').checked
    var pref_fontes = document.getElementById('pref_fontes').checked

    var pref_descricao = document.getElementById('pref_descricao').value == '' ? false : true;

    btn.disabled = !(pref_frequencia || pref_relevantes || pref_fontes || pref_descricao)

}
</script>
%%[ else ]%%
<div class="container">    
    <p class="title_opnion">
        Obrigado pelas informações.
    </p>
    <p class="title_comunica2">
        <span>
            Usaremos suas respostas para aperfeiçoar os nossos envios de e-mail.
        </span>
    </p>
</div>
%%[ endif ]%%
%%[ else ]%%
<div class="container">
    <p class="title_opnion">
        Whops!
    </p>
    <p class="title_comunica2">
        <span>
            Desculpe o transtorno, tivemos um imprevisto técnico.
        </span>
    </p>
</div>
%%[ endif ]%%
%%[ endif ]%%
</body>
</html>

