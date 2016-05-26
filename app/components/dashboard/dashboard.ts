'use strict'
import { OnInit, Component } from '@angular/core'
import { Router } from '@angular/router-deprecated'

import { Hero } from '../../models/hero'
import { HeroService } from '../../services/hero.service'

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.html',
  styleUrls: ['dashboard.css']
})
export class DashboardComponent implements OnInit{
  heroes: Hero[] = []

  constructor(
    private router: Router,
    private heroService: HeroService
  ) {}

  ngOnInit () {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1,5))
  }

  gotoDetail (hero: Hero) {
    const link = ['HeroDetail', { id: hero.id }]
    this.router.navigate(link)
  }
}