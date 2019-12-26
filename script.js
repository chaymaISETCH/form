

                        $.material.init();

                        Survey.defaultBootstrapMaterialCss.navigationButton = "btn btn-green";
                        Survey.defaultBootstrapMaterialCss.rating.item = "btn btn-default my-rating";
                        Survey.StylesManager.applyTheme("bootstrapmaterial");
                        
                        
                        
                        var json = { pages: [
                             
                                {questions: [
                                    { type: "text", name: "q1", 
                                    title: "Combien de personnes compte votre foyer ?"},
                            
                                    { type: "radiogroup", name: "q2", 
                                        title: "Quel est votre rôle au sein de votre foyer ?",
                                        choices: ["Mère", "Père", "Enfant", "Grand-parent","Autre"]},
                                       
                                    { type: "radiogroup", name: "q3",
                                     title: "Combien de personnes dans votre foyer ont une source stable de revenu ?",
                                        choices: ["1","2","3","plus"]},
                             
                                ]},
                                { questions: [
                                    { type: "radiogroup", name: "q4",
                                    title: "Qui paye habituellement les factures ?",
                                       choices: ["Moi","Mon/ma partenaire","Parents","Autres"]},
                                       { type: "radiogroup", name: "q5",
                                       title: "Comment mangez-vous le plat principal de la journée ?",
                                          choices: ["Ensemble","Séparément" ]}
                                         ]},
                                { questions: [
                                           { type: "radiogroup", name: "q6",
                                           title: "Qui fait habituellement la cuisine dans votre foyer ?",
                                              choices: ["Moi","Mon/ma partenaire","Parents","Enfant","Autres"]},
                                              { type: "radiogroup", name: "q7",
                                              title: "Qui fait habituellement le ménage dans votre foyer ?",
                                              choices: ["Moi","Mon/ma partenaire","Parents","Enfant","Autres"]},
                                                ]},
                                { questions: [
                                    { type: "radiogroup", name: "q8",
                                    title: "Organisez-vous des rassemblements dans votre foyer ?",
                                       choices: ["Oui","Non" ]},
                                       { type: "radiogroup", name: "q9",
                                       title: "Comment regardez-vous habituellement des films dans votre foyer ?",
                                          choices: ["Ensemble","Séparément" 
                                         ]},
                                         { type: "radiogroup", name: "q10",
                                         title: "Qui s'occupe le plus souvent des animaux dans votre foyer ?",
                                         choices: ["Moi","Mon/ma partenaire","Parents","Enfant","Nous n'avons pas d'animaux","Autres"]},
                                           ]},
                             { questions: [
                                    { type: "radiogroup", name: "q11",
                                    title: "Comment les membres de votre foyer passent-ils habituellement leur temps libre ?",
                                       choices: ["Ensemble","Séparément","Parfois ensemble, parfois séparément" ]},
                                       { type: "radiogroup", name: "q12",
                                       title: "Qui paye habituellement pour l'entretien du foyer ?",
                                          choices: ["Moi","Mon/ma partenaire","Parents","Autre" 
                                         ]},
                                         { type: "radiogroup", name: "q13",
                                         title: "Vous êtes ...",
                                         choices: ["Femme","Homme"]},
                                           ]},
                            ]
                        };
                        
                        window.survey = new Survey.Model(json);
                        
                        
                            survey.onComplete.add(function(result) {
                                document.querySelector('#surveyResult').textContent =
                                    "Result JSON:\n" + JSON.stringify(result.data, null, 3);
                            });
                        
                        
                        $("#surveyElement").Survey({ 
                            model: survey 
                        });
                        
                        
                                            