import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

/**
 * A service which will be injected into VarViewerComponent to supply the ability to persist json
 * data
 */
@Injectable({
  providedIn: 'root'
})
export class PersistService {

  /**
   * Below 4 properties consist of the url of persistence REST API, for example:
   * /zosmf/IzuUICommon/persistence/app/MYEXTAPP/APPTSO/persist
   */
  persistUrl = "/IzuUICommon/persistence/app";
  /**
   * pluginId, taskId, taskSAFResourceName is as same as the imported properites file 
   * (myextapp.properties)
   */
  pluginId = "MYEXTAPP";
  taskId = "APPTSO";
  resourcePath;

  /**
   * saf resouce name is appended as parameter of the url, you should also do RACF authorization
   * before invoking persist service, see README.md for detail
   */
  taskSAFResourceName = "ZOSMF.IBM_MYEXTAPP.APPTSO.VARVIEWER";
  
  /**
   * below 2 properties is used for consist of the body.
   * "update": true means that you could update one or more properties in JSON instead of override it 
   */
  version = "1.0.0";
  isUpdate = true;

  constructor(private httpClient: HttpClient) { }

  /**
   * read JSON data from server
   * @param path the path of the JSON you want to read
   */
  getJson(path: String): Observable<any> {
    let url = this.persistUrl +"/"+ this.pluginId +"/"+ this.taskId +"/"+ path +
              "?saf="+ this.taskSAFResourceName;
    return this.httpClient.get(url);
  }

  /**
   * save JSON data to server
   * @param path the path of the JSON you want to save
   * @param jsonVar the JSON data you want to save
   */
  putJson(path: String, jsonVar): Observable<any> {
    let url = this.persistUrl +"/"+ this.pluginId +"/"+ this.taskId +"/"+ path +
              "?saf="+ this.taskSAFResourceName;
    let body = {
      version: this.version,
      value: jsonVar,
      update: this.isUpdate
    };
    return this.httpClient.put(url, JSON.stringify(body));
  }
}
