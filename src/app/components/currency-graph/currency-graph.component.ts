import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import cytoscape from 'cytoscape';
import { CurrencyService } from '../../services/currency.service';
import { CurrencyExchangeDto } from '../../models/currency-exchange.dto';
import { CytoscapeElement } from '../../visualization/models/cytoscape-types';

@Component({
  selector: 'app-currency-graph',
  standalone: true,
  templateUrl: './currency-graph.component.html',
  styleUrl: './currency-graph.component.scss',
})

export class CurrencyGraphComponent implements OnInit {
  @ViewChild('graphContainer', { static: true }) graphContainer!: ElementRef;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.currencyService.getAllCurrenciesExchanges().subscribe((exchanges) => {
      const nodes = new Set<string>();
      const seenPairs = new Set<string>();
      const edges: CytoscapeElement[] = [];

      for (const e of exchanges) {
        nodes.add(e.from);
        nodes.add(e.to);

        const key = [e.from, e.to].sort().join('-');
        if (!seenPairs.has(key)) {
          seenPairs.add(key);
          edges.push({
            data: {
              id: key,
              source: e.from,
              target: e.to
            }
          });
        }
      }

      const elements: CytoscapeElement[] = [
        ...Array.from(nodes).map(code => ({
          data: {
            id: code,
            label: code
          }
        })),
        ...edges
      ];


      cytoscape({
        container: this.graphContainer.nativeElement,
        elements,
        style: [
          {
            selector: 'node',
            style: {
              'label': 'data(label)',
              'text-valign': 'center',
              'color': '#000',
              'background-color': '#BFD7B5',
              'shape': 'ellipse', // ellipse, rectangle, round-rectangle, triangle, pentagon, hexagon, octagon, star, diamond, vee, tag, barrel, rhomboid
              'text-outline-color': '#fff',
              'text-outline-width': 1
            }
          },
          {
            selector: 'node:active',
            style: {
              'overlay-opacity': 0,
              'border-width': 0
            }
          },
          {
            selector: 'edge',
            style: {
              'width': 2,
              'line-color': '#ccc',
              'target-arrow-color': '#ccc',
              'target-arrow-shape': 'none',
              'curve-style': 'bezier' // bezier, straight, unbundled-bezier, haystack, segments
            }
          }
        ],
        layout: {
          name: 'cose', // circle, grid, breadthfirst, cose, concentric
          animate: true
        }
      });
    });
  }
}

