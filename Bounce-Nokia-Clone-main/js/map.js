class LevelMap {
	constructor(level) {
		this.maps = [
			{
				player: {
					x: 2,
					y: 1
				},
				tiles: [
					'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
					'BB   BBBBBB          BBB         BB         BBB                  BBB      BB  L   BB               BB         BB',
					'BB   BBBBBB          BBB         R          BB                    BB      BB      BB               BB         BB',
					'BB   BBBBBB   BB     BBB         +          BB         C          BB  BB  BB  BB  BB  BB           BB         BB',
					'BB   BBBBBB   BB     BBB  BBBB  BBBB  BBBB  BB                    BB  BB  BB  BB  BB  BB       BBE-BBE-BB     BB',
					'BB       R    BB          BB     BB     BB                            BB  R   BB  R   BB    BBTBB  C   BBTBB  G#',
					'BB       +    BB T        BB  T     T   BB        T  T   T   T        BB  +   BB  +   BB    BBBBB      BBBBB  ##',
					'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB'
				],
				rings : 6
			},
			{
				player: {
					x: 9,
					y: 15
				},
				tiles: [
					'                                                                                                              BBBBBBBBBBBBBBBBBBBBBBBB',
					'                                                                                                              BBC                   BB',
					'                                                                                                              BB          R         BB',
					'                                                                                                              BB          +         BB',
					'                                                                                                              BBBBBBBBBBBBBB        BB',
					'                                                                                                              BB                    G#',
					'                                                                                                              BB                    ##',
					'                                                                                                              BB   BBBBBBBBBBBBBBBBBBB',
					'                                                                                                              BB                    BB',
					'                                                                                                              BB                    BB',
					'                                                                                                              BBBB      BB  BB      BB',
					'                                                                                                              BBC      BB    BB     BB',
					'                                                                                                              BB      BB      BB    BB',
					'                                                                                                              BB     BB   T    BB   BB',
					'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBE-BB',
					'BB                    R   BB      BB     R                        BB        C           BB         BB         R   BB         BB     BB',
					'BB                    +   BB      BB     +                        BB                    BB         BB         +   BB         BB     BB',
					'BB             BBBBBBBBB  BB  BB         BBBBB                    BB        XZ          BB         R          BB  BB    BB   BB  BBBBB',
					'BB             BB     BB  BB  BB         BBBBB                    BB       XBBZ         BB         +          BB  BB  BBBB          BB',
					'BB             BB L           BB         BBBBB                    R       XBBBBZ        R          BB         BB      L BB          BB',
					'BB           T BB             BBP        BBBBB                    +      XBBBBBBZ       +          BB         BB        BB        T BB',
					'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBDDDDDDDDDBBBBBBBBBBBBBBBBBBBBBBBB'
				],
				rings: 8,
				enemies: [
					{
						x: 2,
						y: 15,
						d: 0
					},
					{
						x: 4,
						y: 15,
						d: 0
					},
					{
						x: 49,
						y: 15,
						d: 0
					},
					{
						x: 55,
						y: 15,
						d: 0
					},
					{
						x: 61,
						y: 15,
						d: 0
					},
					{
						x: 93,
						y: 15,
						d: 0
					}
				]
			},
			{
				player:  {
					x: 52,
					y: 2
				},
				tiles: [
					'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
					'BBY Y   L BBC                             VBBB            R      BBBN    VBBBBBBBN         C         %%                           L BB',
					'BB        BB                               VBB            +      BBN      VBBBBBN                               BB  BB              BB',
					'BB        BBZ        XBB                    R             XZ     R             R                                          BB        BB',
					'BB        BBBZ      XBBB                    +            XBB     +             +                                  BB            BB  BB',
					'BB        BBBBZ    XBBBB                   XBB          XBG#     BBZ      XBBBBBZ     XBBZ      XBBBBBBBBBBBBBBB       BB      BB   BB',
					'BB        BBBBBZ  XBBBBB                  XBBB         XBB##     BBBZ    XBBBBBBBZ   XBBBB000000BBBBBBBBBBBBBBBB          BBTT    T BB',
					'BBBBB     BBBBBBE-BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB0000BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
					'BB                             BB    BB             Y     Y   VBBBBBBNY VBBBBBBBBBBBBBBBBBB0000BB             BB                      ',
					'BB                             BB    BB                        VBBBBN    VBBBBBBBBBBBBBBBBB0000BB  BB 0  BB   BB                      ',
					'BB    BB                       R     R                          VBBB      BBBBBBBBBBBBBBBBB0000BB     0       BB                      ',
					'BB    Y   BB0000000000BBBB     +     +      BBZ                  VBB      BBBBBBBBBBBBBBBBB0000BB    00  000  BB                      ',
					'BB        BBB00000000BBBBB     BB    BB     BBBZ                          BBBBBBBBBBBBBBBBB0000BB BB     0 0  BB                      ',
					'BB        BBBB000000BBBBBB     BB    BBT   TBBBBZ      S                  BBBBBBBBBBBBBBBBB0000BB        0 0  BB                      ',
					'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB    BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBZ     BBBBBBBBBBBBBBBBB0000BB     BB      BB                      ',
					'                      BB                    BB                    BBB     BBBBBBBBBBBBBBBBB0000BBBZ      XBBBBBB                      ',
					'                      BB                    BB                    BBB     BBBBBBBBBBBBBBBBB0000BBBN       BBBBBB                      ',
					'                      BBDD                  BB                    BBB     BBBBBBBBBBBBBBBBB0000BBN        VBBBBB                      ',
					'                      BBIIIIIIIIIIIIIIII    BB                    BBB     BBBBBBBBBBBBBBBBB0000BBZ         VBBBB                      ',
					'                      BBC                   BB                    BBB     BBBBBBBBBBBBBBBBB0000BBBZ         VBBB                      ',
					'                      BB                    BB                    BBB     BBBBBBBBBBBBBBBBB0000BBBBZ         VBB                      ',
					'                      BBBBBBBBBBBBBBBBBBBBBBBB                    BBB     BBBBBBBBBBBBBBBBB0000BBBBB         XBB                      ',
					'                                                                  BBB C   BBBBBBBBBBBBBBBBB0000BBBBBBZ      XBBB                      ',
					'                                                                  BBB     BBBBBBBBBBBBBBBBB0000BBBBBBN      VBBB                      ',
					'                                                                  BBB     BBBBBBBBBBBBBBBBB0000BBBBBN        VBB                      ',
					'                                                                  BBB C   BBBBBBBBBBBBBBBBB0000BBBBN         XBB                      ',
					'                                                                  BBB     BBBBBBBBBBBBBBBBB0000BBBN         XBBB                      ',
					'                                                                  BBB C   BBBBBBBBBBBBBBBBB0000BBN         XBBBB                      ',
					'                                                                  BBB     BBBBBBBBBBBBBBBBB0000BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
					'                                                                  BBB     BBBBBBBBBBBBBBBBB0000BB             BB                    BB',
					'                                                                  BBB     BBBBBBBBBBBBBBBBB0000BB             BB                 C  BB',
					'                                                                  BBB     BBBBBBBBBBBBBBBBB0000BB             BB                    BB',
					'                                                                  BBB     BBBBBBBBBBBBBBBBB0000BBBBBBBBBBBBBBBBB                    BB',
					'                                                                  BBB     R00000000000000000000000000000000000R           T         BB',
					'                                                                  BBB     +00000000000000000000000000000000000+           BB      P BB',
					'                                                                  BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB'
				],
				rings: 9,
				enemies: [
					{
						x: 28,
						y: 1,
						d: 0
					},
					{
						x: 30,
						y: 1,
						d: 0
					},
					{
						x: 32,
						y: 1,
						d: 0
					},
					{
						x: 34,
						y: 1,
						d: 0
					},
					{
						x: 36,
						y: 1,
						d: 0
					},
					{
						x: 38,
						y: 1,
						d: 0
					},
					{
						x: 26,
						y: 8,
						d: 0
					},
					{
						x: 100,
						y: 16,
						d: 0
					},
					{
						x: 102,
						y: 16,
						d: 0
					},
					{
						x: 104,
						y: 16,
						d: 0
					},
					{
						x: 116,
						y: 29,
						d: 0
					},
					{
						x: 98,
						y: 29,
						d: 1,
						dist: 10
					}
				]
			},
			{
				player: {
					x: 99,
					y: 22
				},
				// player: {
				// 	x: 59,
				// 	y: 15
				// },
				tiles: [
					'                      BBBBBBBBBBBBBBBBBBBBBBBB                                                                                        ',
					'                      BBBBN              BBBBB                                                                                        ',
					'                      BBBB               BBBBB                                                                                        ',
					'                      BBG#               BBBBB                                                                                        ',
					'                      BB##               BBBBB                                                                                        ',
					'                      BBBBZ              BBBBB                                                                                        ',
					'                      BBBBBBBBBBBB          BB                                                                                        ',
					'                      BBBBBBBBBBBB          BB                                                                                        ',
					'                      BB    C               BB                                                                                        ',
					'                      BB                    BB                                                                                        ',
					'                      BB                    BB                                                                                        ',
					'                      BB                    BB                                                                                        ',
					'                      BB              T     BB                                                                                        ',
					'                      BB              BBIIIIBB                                                                                        ',
					'BBBBBBBBBBBBBBBBBBBBBBBB                    BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB                      ',
					'BBL                                                     R                 R    R                R             BB                      ',
					'BB                                                      +                 +    +                +             BB                      ',
					'BBE-                         XIIIIZ                  BBZ  XBB             VBBBBN        BB                    BB                      ',
					'BBC                   BBBBBBBBBBBBBZ              X  BBBZXBBB  Z           VBBN         BB      BB    BB  C   BB                      ',
					'BB                    BBBBBBBBBBBBBBZ            XB  BBBBBBBB  BZ     XT Z      XT Z    BB      BB    BB      BB                      ',
					'BB                    BBBBBBBBBBBBBBBZ          XBB  BB    BB  BBZ   XBBBBZ T  XBBBBZ   BB  T   BB    BB  DD  BB                      ',
					'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB    BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
					'                      BB    BB        BB                                               VBBBB  BBBN    VBBB  BBBBC                 C BB',
					'                      BB L  BB        BB                                                BBBB  BBN      VBB  BBBB                    BB',
					'                      BB    BB        BB    BB                       II  II    II  II   BBBB  BN  XBBZ  VB  BBBBBBBB          BBBBBBBB',
					'                      BB    BB        BB    BB    X    Z X   Z        IIII  C   IIII    BBBB  N  XBBBBZ  V  BBBBBBBN          VBBBBBBB',
					'                      BB                    BB   XB    BZB   BZ       IIII      IIII            XBBBBBBZ          R            R  O BB',
					'                      BB                    BB     IIII   III         IIIIIIIIIIIIII           XBBBBBBBBZ         +            +  P BB',
					'                      BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB'

				],
				rings: 7,
				enemies: [
					{
						x: 5,
						y: 19,
						d: 1,
						dist: 15
					},
					{
						x: 51,
						y: 15,
						d: 0
					},
					{
						x: 61,
						y: 15,
						d: 0
					},
					{
						x: 92,
						y: 22,
						d: 0
					},
					{
						x: 106,
						y: 22,
						d: 0
					},
					{
						x: 118,
						y: 22,
						d: 0
					},
					{
						x: 106,
						y: 22,
						d: 0
					},
					{
						x: 122,
						y: 22,
						d: 0
					},
					{
						x: 31,
						y: 22,
						d: 0
					},
					{
						x: 33,
						y: 22,
						d: 0
					},
					{
						x: 35,
						y: 22,
						d: 0
					}
				]
			}
		];

		return this.maps[level];
	}
}