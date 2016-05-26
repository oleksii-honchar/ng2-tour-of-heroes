'use strict'
import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/toPromise'

import { Hero } from '../models/hero'

@Injectable()
export class HeroService {
  private heroesUrl = 'app/heroes'

  constructor (
    private http: Http
  ) {}

  getHero (id: number): Promise<Hero> {
    return this.getHeroes()
      .then(heroes => heroes.filter(hero => hero.id === id)[0])
  }

  getHeroes (): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => {
        return response.json().data
      })
      .catch(this.handleError)
  }

  handleError (err: any) {
    console.error('Ann error occurred', err)
    return Promise.reject(err.message || err)
  }

  private post (hero: Hero): Promise<Hero> {
    let headers = new Headers({ 'Content-Type': 'application/json' })

    return this.http
      .post(this.heroesUrl, JSON.stringify(hero), { headers })
      .toPromise()
      .then(res => {
        return res.json().data
      })
      .catch(this.handleError)
  }

  private put (hero: Hero): Promise<Hero> {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    const url = `${this.heroesUrl}/${hero.id}`

    return this.http
      .put(url, JSON.stringify(hero), { headers })
      .toPromise()
      .then(() => hero)
      .catch(this.handleError)
  }
  
  save (hero: Hero): Promise<Hero> {
    if (hero.id) { return this.put(hero) }

    return this.post(hero)
  }

  delete (hero: Hero) {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    const url = `${this.heroesUrl}/${hero.id}`

    return this.http
      .delete(url, { headers })
      .toPromise()
      .catch(this.handleError)
  }
}