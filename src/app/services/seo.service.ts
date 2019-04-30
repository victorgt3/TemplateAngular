import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';
import { StringUtils } from '../utils/string.utils';

@Injectable()
export class SeoService{
    private titleService: Title;
    private headElement: HTMLElement;
    private metaDescription: HTMLElement;
    private metaKeywords: HTMLElement;
    private robots: HTMLElement;
    private DOM: any;
    
    public constructor(titleService: Title){
        this.titleService = titleService;
        this.DOM.getDOM();
        this.headElement = this.DOM.query('head');
        this.setTitle('');
    }

    public setSeoData(SeoModel: SeoModel){
        this.setTitle(SeoModel.title);
        this.setMetaRobots(SeoModel.robots);
        this.setMetaDescription(SeoModel.description);
        this.setMetaKeywords(SeoModel.keywords);        
    }

    private setMetaDescription(description: string){
        this.metaDescription = this.getOrCreateMetaElement('description');
        if(StringUtils.isNullOrEmpty(description)){description = "Aqui você encontra um evento técnico próximo de você."}
        this.metaDescription.setAttribute('content', description);
    }

    private setMetaKeywords(keywords: string){
        this.metaDescription = this.getOrCreateMetaElement('keywords');
        if(StringUtils.isNullOrEmpty(keywords)){ keywords= "eventos,workshops,encontros,congressos,comunidades,tecnologia"}
        this.metaDescription.setAttribute('content', keywords);
    }

    private setMetaRobots(robots: string){
        this.metaDescription = this.getOrCreateMetaElement('robots');
        if(StringUtils.isNullOrEmpty(robots)) {robots= "all" }
        this.metaDescription.setAttribute('content', robots);
    }

    private setTitle(newTitle: string){
        if(StringUtils.isNullOrEmpty(newTitle)){newTitle = "Defina um titulo"}
        this.titleService.setTitle(newTitle + " - Eventos.IO")
    }

    private getOrCreateMetaElement(name: string): HTMLElement{
        let el: HTMLElement;
        el = this.DOM.query('meta[name=' + name + ']');
        if(el === null){
            el = this.DOM.createElement('meta');
            el.setAttribute('name', name);
            this.headElement.appendChild(el);
        }
        return el;
    }
}

export class SeoModel{
    public title: string = '';
    public description: string = '';
    public robots: string = '';
    public keywords: string = '';


}