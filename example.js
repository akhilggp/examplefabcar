/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabCertif extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const datas = [
            { 
               base64img: 'akhlasdf/123ajbsmdf/qh,asdbb1',
            },
            { 
                base64img: 'akhlasdf/123ajbsmdf/qh,asdbb2',
            },
            {
                base64img: 'akhlasdf/123ajbsmdf/qh,asdbb3',
            },
            {
                base64img: 'akhlasdf/123ajbsmdf/qh,asdbb4',
            },
        ];
        const username=['akhil123','raghav1231','akash1234','akh4321'];

        for (let i = 0; i < datas.length; i++) {
            datas[i].docType = 'data';
            await ctx.stub.putState(username[i], Buffer.from(JSON.stringify(datas[i])));
            console.info('Added <--> ', username[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryCertif(ctx, username) {
        const dataAsBytes = await ctx.stub.getState(username); 
        if (!dataAsBytes || dataAsBytes.length === 0) {
            throw new Error(`${username} does not exist`);
        }
        console.log(dataAsBytes.toString());
        return dataAsBytes.toString();
    }

    async storeCertif(ctx, username,base64img) {
        console.info('============= START : Create Car ===========');

        const data = {
            docType: 'data',
            base64img,
        };

        await ctx.stub.putState(username, Buffer.from(JSON.stringify(data)));
        console.info('============= END : Create Car ===========');
    }
    async deleteCertif(ctx, username){
        await ctx.stub.getState(username);
        console.log('Certif deleted from the ledger Succesfully..');
    }


    // async queryAllCars(ctx) {
    //     const startKey = 'CAR0';
    //     const endKey = 'CAR999';

    //     const iterator = await ctx.stub.getStateByRange(startKey, endKey);

    //     const allResults = [];
    //     while (true) {
    //         const res = await iterator.next();

    //         if (res.value && res.value.value.toString()) {
    //             console.log(res.value.value.toString('utf8'));

    //             const Key = res.value.key;
    //             let Record;
    //             try {
    //                 Record = JSON.parse(res.value.value.toString('utf8'));
    //             } catch (err) {
    //                 console.log(err);
    //                 Record = res.value.value.toString('utf8');
    //             }
    //             allResults.push({ Key, Record });
    //         }
    //         if (res.done) {
    //             console.log('end of data');
    //             await iterator.close();
    //             console.info(allResults);
    //             return JSON.stringify(allResults);
    //         }
    //     }
    // }

    // async changeCarOwner(ctx, carNumber, newOwner) {
    //     console.info('============= START : changeCarOwner ===========');

    //     const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
    //     if (!carAsBytes || carAsBytes.length === 0) {
    //         throw new Error(`${carNumber} does not exist`);
    //     }
    //     const car = JSON.parse(carAsBytes.toString());
    //     car.owner = newOwner;

    //     await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
    //     console.info('============= END : changeCarOwner ===========');
    // }

};

module.exports = FabCertif;
