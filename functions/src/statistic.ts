import * as admin from "firebase-admin";
import { typeStatistic, personTypeObj } from "./data";
import { caseStatus, updatedArrayItem } from "./mapping";
// import { toNumber } from './mapping';

// export function onAddCrimeStatistic(change: any, context: any) {
// const doc = change.data();
// const db = admin.firestore();
// const {
//     village, create_date_year, create_date_month,
//     victim_total, victim_female_total, suspect_total, suspect_female_total, suspect_arrested_total, suspect_arrested_female_total,

//     } = doc;
// const { province } = village;

// // const statisticRef = db.collection("crime_statistic");
// // const statisticYearRef = statisticRef.doc(create_date_year);
// // const statisticMonthRef = statisticRef.doc(create_date_year).collection("month").doc(create_date_month);

// return db.runTransaction(async transaction => {

//     const statisticYearData = await transaction.get(statisticYearRef);

//     // const statisticData = await transaction.get(statisticMonthRef);
//     // const statisticDoc = statisticData.exists ? [] : statisticData.data();

//     // const statisticProvinceData = await transaction.get(statisticMonthRef.doc(province.key).collection("province"));
//     // const statisticProvinceArray = statisticProvinceData.empty ? [] : statisticProvinceData.docs.map(m => ({ ...m.data() }));

//     if (!statisticYearData.exists) {

//         //YEAR
//         const yearData = {
//             key: create_date_year,
//         }
//         transaction.set(statisticRef.doc(yearData.key), yearData);

//         //MONTH
//         for (let i = 1; i <= 12; i++) {
//             let index = i.toString();
//             if (index.length === 1) {
//                 index = "0" + index;
//             }
//             const monthKey = create_date_year.toString() + index;
//             const monthData = {
//                 key: monthKey,
//                 period: toNumber(monthKey),
//             }
//             transaction.set(statisticRef.doc(yearData.key).collection("month").doc(monthData.key), monthData);
//         }
//     }

//     // All PROVINCE CATEGORY SUBCATEGORY
//     if (statisticData.exists) {

//         // const {category, provinces} = statisticDoc;
//         // const s_province = provinces.filter(m=> m.key === province.key);

//         // if(s_province && s_province.length>0){

//         // }else{
//         //     const num1 = 1;
//         //     const num0 = 0;
//         //     const s_province_item = {
//         //         key: province.key,
//         //         name: province.name,
//         //         total_case: num1,
//         //         total_case_pending: num1,
//         //         total_case_completed: num1,
//         //         total_case_close: num1,
//         //         total_judgement: num1,
//         //         total_judgement_pending: num1,
//         //         total_judgement_completed: num1,

//         //         total_suspect: suspect_total,
//         //         total_suspect_female: suspect_female_total,
//         //         total_suspect_18: num0,
//         //         total_suspect_1418: num0,
//         //         total_suspect_14: num0,

//         //         total_suspect_arrested: suspect_arrested_total,
//         //         total_suspect_arrested_female: suspect_arrested_female_total,
//         //         total_suspect_arrested_18: num0,
//         //         total_suspect_arrested_1418: num0,
//         //         total_suspect_arrested_14: num0,

//         //         total_victim: victim_total,
//         //         total_victim_female: victim_female_total,
//         //         total_victim_18: num0,
//         //         total_victim_1418: num0,
//         //         total_victim_14: num0,
//         //     }
//         // }


//         // REGION STATISTIC
//         // const regionStatistic = statisticArray.filter(m => m.type.key === typeStatistic.region.key && m.key === province.key);
//         // if (regionStatistic && regionStatistic.length > 0) {
//         //     const { value } = regionStatistic[0];
//         //     transaction.update(statisticMonthRef.doc(province.key), {
//         //         value: value + 1
//         //     })
//         // } else {
//         //     transaction.set(statisticMonthRef.doc(province.key), {
//         //         value: 1,
//         //         label: province.name,
//         //         key: province.key,
//         //         type: typeStatistic.region
//         //     })
//         // }

//         // CATEGORY
//         // const categoryStatistic = statisticArray.filter(m => m.type.key === typeStatistic.category.key && m.key === category.key);
//         // if (categoryStatistic && categoryStatistic.length > 0) {
//         //     const { value } = categoryStatistic[0];
//         //     transaction.update(statisticMonthRef.doc(category.key), {
//         //         value: value + 1
//         //     })
//         // } else {
//         //     transaction.set(statisticMonthRef.doc(category.key), {
//         //         value: 1,
//         //         label: category.name,
//         //         key: category.key,
//         //         type: typeStatistic.category
//         //     })
//         // }

//         // SUBCATEGORY
//         // const subCategoryStatistic = statisticArray.filter(m => m.type.key === typeStatistic.subCategory.key && m.key === sub_category.key);
//         // if (subCategoryStatistic && subCategoryStatistic.length > 0) {
//         //     const { value } = subCategoryStatistic[0];
//         //     transaction.update(statisticMonthRef.doc(sub_category.key), {
//         //         value: value + 1
//         //     })
//         // } else {
//         //     transaction.set(statisticMonthRef.doc(sub_category.key), {
//         //         value: 1,
//         //         label: sub_category.name,
//         //         key: sub_category.key,
//         //         type: typeStatistic.subCategory
//         //     })
//         // }
//     }
//     // else {

//     //     transaction.set(statisticMonthRef.doc(province.key), {
//     //         value: 1,
//     //         label: province.name,
//     //         key: province.key,
//     //         type: typeStatistic.region
//     //     })
//     //     transaction.set(statisticMonthRef.doc(category.key), {
//     //         value: 1,
//     //         label: category.name,
//     //         key: category.key,
//     //         type: typeStatistic.category
//     //     })
//     //     transaction.set(statisticMonthRef.doc(sub_category.key), {
//     //         value: 1,
//     //         label: sub_category.name,
//     //         key: sub_category.key,
//     //         type: typeStatistic.subCategory
//     //     })
//     // }

//     // BY PROVINCE CATEGORY SUBCATEGORY
//     // if (!statisticProvinceData.empty) {

//     //     // REGION STATISTIC
//     //     const regionStatistic = statisticProvinceArray.filter(m => m.type.key === typeStatistic.region.key && m.key === province.key);
//     //     if (regionStatistic && regionStatistic.length > 0) {
//     //         const { value } = regionStatistic[0];
//     //         transaction.update(statisticMonthRef.doc(province.key).collection("province").doc(province.key), {
//     //             value: value + 1
//     //         })
//     //     } else {
//     //         transaction.set(statisticMonthRef.doc(province.key).collection("province").doc(province.key), {
//     //             value: 1,
//     //             label: province.name,
//     //             key: province.key,
//     //             type: typeStatistic.region
//     //         })
//     //     }

//     //     // CATEGORY
//     //     const categoryStatistic = statisticProvinceArray.filter(m => m.type.key === typeStatistic.category.key && m.key === category.key);
//     //     if (categoryStatistic && categoryStatistic.length > 0) {
//     //         const { value } = categoryStatistic[0];
//     //         transaction.update(statisticMonthRef.doc(province.key).collection("province").doc(category.key), {
//     //             value: value + 1
//     //         })
//     //     } else {
//     //         transaction.set(statisticMonthRef.doc(province.key).collection("province").doc(category.key), {
//     //             value: 1,
//     //             label: category.name,
//     //             key: category.key,
//     //             type: typeStatistic.category
//     //         })
//     //     }

//     //     // SUBCATEGORY
//     //     const subCategoryStatistic = statisticProvinceArray.filter(m => m.type.key === typeStatistic.subCategory.key && m.key === sub_category.key);
//     //     if (subCategoryStatistic && subCategoryStatistic.length > 0) {
//     //         const { value } = subCategoryStatistic[0];
//     //         transaction.update(statisticMonthRef.doc(province.key).collection("province").doc(sub_category.key), {
//     //             value: value + 1
//     //         })
//     //     } else {
//     //         transaction.set(statisticMonthRef.doc(province.key).collection("province").doc(sub_category.key), {
//     //             value: 1,
//     //             label: sub_category.name,
//     //             key: sub_category.key,
//     //             type: typeStatistic.subCategory
//     //         })
//     //     }

//     // } else {

//     //     transaction.set(statisticMonthRef.doc(province.key), {
//     //         value: 1,
//     //         label: province.name,
//     //         key: province.key,
//     //         type: typeStatistic.region
//     //     })

//     //     transaction.set(statisticMonthRef.doc(province.key).collection("province").doc(category.key), {
//     //         value: 1,
//     //         label: category.name,
//     //         key: category.key,
//     //         type: typeStatistic.category
//     //     })
//     //     transaction.set(statisticMonthRef.doc(province.key).collection("province").doc(sub_category.key), {
//     //         value: 1,
//     //         label: sub_category.name,
//     //         key: sub_category.key,
//     //         type: typeStatistic.subCategory
//     //     })
//     // }

// });
// }

// export function onAddCrimeStatistic(change: any, context: any) {
//     const doc = change.data();
//     const db = admin.firestore();
//     const { category, sub_category, village, create_date_year, create_date_month } = doc;
//     const { province } = village;

//     const statisticRef = db.collection("crime_statistic");
//     const crimeRef = db.collection("crime");
//     const statisticYearRef = statisticRef.doc(create_date_year);
//     const statisticMonthRef = statisticRef.doc(create_date_year).collection("month").doc(create_date_month).collection("statistic");

//     return db.runTransaction(async transaction => {

//         const statisticYearData = await transaction.get(statisticYearRef);

//         const statisticData = await transaction.get(statisticMonthRef);
//         const statisticArray = statisticData.empty ? [] : statisticData.docs.map(m => ({ ...m.data() }));

//         const statisticProvinceData = await transaction.get(statisticMonthRef.doc(province.key).collection("province"));
//         const statisticProvinceArray = statisticProvinceData.empty ? [] : statisticProvinceData.docs.map(m => ({ ...m.data() }));

//         if (!statisticYearData.exists) {

//             //YEAR
//             const yearData = {
//                 key: create_date_year,
//             }
//             transaction.set(statisticRef.doc(yearData.key), yearData);

//             //MONTH
//             for (let i = 1; i <= 12; i++) {
//                 let index = i.toString();
//                 if (index.length === 1) {
//                     index = "0" + index;
//                 }
//                 const monthKey = create_date_year.toString() + index;
//                 const monthData = {
//                     key: monthKey,
//                 }
//                 transaction.set(statisticRef.doc(yearData.key).collection("month").doc(monthData.key), monthData);
//             }
//         }

//         // All PROVINCE CATEGORY SUBCATEGORY
//         if (!statisticData.empty) {

//             // REGION STATISTIC
//             const regionStatistic = statisticArray.filter(m => m.type.key === typeStatistic.region.key && m.key === province.key);
//             if (regionStatistic && regionStatistic.length > 0) {
//                 const { value } = regionStatistic[0];
//                 transaction.update(statisticMonthRef.doc(province.key), {
//                     value: value + 1
//                 })
//             } else {
//                 transaction.set(statisticMonthRef.doc(province.key), {
//                     value: 1,
//                     label: province.name,
//                     key: province.key,
//                     type: typeStatistic.region
//                 })
//             }

//             // CATEGORY
//             const categoryStatistic = statisticArray.filter(m => m.type.key === typeStatistic.category.key && m.key === category.key);
//             if (categoryStatistic && categoryStatistic.length > 0) {
//                 const { value } = categoryStatistic[0];
//                 transaction.update(statisticMonthRef.doc(category.key), {
//                     value: value + 1
//                 })
//             } else {
//                 transaction.set(statisticMonthRef.doc(category.key), {
//                     value: 1,
//                     label: category.name,
//                     key: category.key,
//                     type: typeStatistic.category
//                 })
//             }

//             // SUBCATEGORY
//             const subCategoryStatistic = statisticArray.filter(m => m.type.key === typeStatistic.subCategory.key && m.key === sub_category.key);
//             if (subCategoryStatistic && subCategoryStatistic.length > 0) {
//                 const { value } = subCategoryStatistic[0];
//                 transaction.update(statisticMonthRef.doc(sub_category.key), {
//                     value: value + 1
//                 })
//             } else {
//                 transaction.set(statisticMonthRef.doc(sub_category.key), {
//                     value: 1,
//                     label: sub_category.name,
//                     key: sub_category.key,
//                     type: typeStatistic.subCategory
//                 })
//             }
//         } else {

//             transaction.set(statisticMonthRef.doc(province.key), {
//                 value: 1,
//                 label: province.name,
//                 key: province.key,
//                 type: typeStatistic.region
//             })
//             transaction.set(statisticMonthRef.doc(category.key), {
//                 value: 1,
//                 label: category.name,
//                 key: category.key,
//                 type: typeStatistic.category
//             })
//             transaction.set(statisticMonthRef.doc(sub_category.key), {
//                 value: 1,
//                 label: sub_category.name,
//                 key: sub_category.key,
//                 type: typeStatistic.subCategory
//             })
//         }

//         // BY PROVINCE CATEGORY SUBCATEGORY
//         if (!statisticProvinceData.empty) {

//             // REGION STATISTIC
//             const regionStatistic = statisticProvinceArray.filter(m => m.type.key === typeStatistic.region.key && m.key === province.key);
//             if (regionStatistic && regionStatistic.length > 0) {
//                 const { value } = regionStatistic[0];
//                 transaction.update(statisticMonthRef.doc(province.key).collection("province").doc(province.key), {
//                     value: value + 1
//                 })
//             } else {
//                 transaction.set(statisticMonthRef.doc(province.key).collection("province").doc(province.key), {
//                     value: 1,
//                     label: province.name,
//                     key: province.key,
//                     type: typeStatistic.region
//                 })
//             }

//             // CATEGORY
//             const categoryStatistic = statisticProvinceArray.filter(m => m.type.key === typeStatistic.category.key && m.key === category.key);
//             if (categoryStatistic && categoryStatistic.length > 0) {
//                 const { value } = categoryStatistic[0];
//                 transaction.update(statisticMonthRef.doc(province.key).collection("province").doc(category.key), {
//                     value: value + 1
//                 })
//             } else {
//                 transaction.set(statisticMonthRef.doc(province.key).collection("province").doc(category.key), {
//                     value: 1,
//                     label: category.name,
//                     key: category.key,
//                     type: typeStatistic.category
//                 })
//             }

//             // SUBCATEGORY
//             const subCategoryStatistic = statisticProvinceArray.filter(m => m.type.key === typeStatistic.subCategory.key && m.key === sub_category.key);
//             if (subCategoryStatistic && subCategoryStatistic.length > 0) {
//                 const { value } = subCategoryStatistic[0];
//                 transaction.update(statisticMonthRef.doc(province.key).collection("province").doc(sub_category.key), {
//                     value: value + 1
//                 })
//             } else {
//                 transaction.set(statisticMonthRef.doc(province.key).collection("province").doc(sub_category.key), {
//                     value: 1,
//                     label: sub_category.name,
//                     key: sub_category.key,
//                     type: typeStatistic.subCategory
//                 })
//             }

//         } else {

//             transaction.set(statisticMonthRef.doc(province.key), {
//                 value: 1,
//                 label: province.name,
//                 key: province.key,
//                 type: typeStatistic.region
//             })

//             transaction.set(statisticMonthRef.doc(province.key).collection("province").doc(category.key), {
//                 value: 1,
//                 label: category.name,
//                 key: category.key,
//                 type: typeStatistic.category
//             })
//             transaction.set(statisticMonthRef.doc(province.key).collection("province").doc(sub_category.key), {
//                 value: 1,
//                 label: sub_category.name,
//                 key: sub_category.key,
//                 type: typeStatistic.subCategory
//             })
//         }

//         transaction.update(crimeRef.doc(doc.key), { isUpdate: true });

//     });
// }

export function onAddCrimeStatistic(change: any, context: any) {
    const doc = change.data();
    const db = admin.firestore();
    const { category, sub_category, village, create_date_year, create_date_month, crime_status } = doc;
    const { province } = village;
    const statisticRef = db.collection("crime_statistic");
    const statisticYearRef = statisticRef.doc(create_date_year);
    const statisticMonthRef = statisticRef.doc(create_date_year).collection("month").doc(create_date_month);

    return db.runTransaction(async transaction => {
        const statisticYearData = await transaction.get(statisticYearRef);
        const statisticMonthData: any = await transaction.get(statisticMonthRef);
        // const statisticProvinceData = await transaction.get(statisticMonthRef.collection("province"));
        // const statisticProvinceArray = statisticProvinceData.empty ? [] : statisticProvinceData.docs.map(m => ({ ...m.data() }));

        if (!statisticYearData.exists) {

            //YEAR
            const yearData = {
                key: create_date_year,
            }
            transaction.set(statisticRef.doc(yearData.key), yearData);

            //MONTH
            for (let i = 1; i <= 12; i++) {
                let index = i.toString();
                if (index.length === 1) {
                    index = "0" + index;
                }
                const monthKey = create_date_year.toString() + index;
                const monthData = {
                    key: monthKey,
                }
                transaction.set(statisticRef.doc(yearData.key).collection("month").doc(monthData.key), monthData);
            }
        }

        const { provinces, categories, sub_categories } = statisticMonthData.data();
        let provinceArray: any = provinces ? provinces : [];
        let categoryArray: any = categories ? categories : [];
        let subCategoryArray: any = sub_categories ? sub_categories : [];
        // All PROVINCE CATEGORY SUBCATEGORY
        if (statisticMonthData.exists) {
            // REGION STATISTIC
            if (provinces && provinces.length > 0) {
                const regionStatistic = provinceArray.filter((m: { key: any; }) => m.key === province.key);
                if (regionStatistic && regionStatistic.length > 0) {
                    const { value, pending, complete, close } = regionStatistic[0];
                    const data = {
                        value: value + 1,
                        pending: pending + caseStatus(crime_status.key).pending,
                        complete: complete + caseStatus(crime_status.key).complete,
                        close: close + caseStatus(crime_status.key).close,
                        label: province.name,
                        key: province.key,
                        type: typeStatistic.region
                    }
                    const provinceNew = updatedArrayItem(provinceArray, data)
                    transaction.update(statisticMonthRef, {
                        provinces: provinceNew
                    })
                } else {
                    const data = {
                        value: 1,
                        pending: 0 + caseStatus(crime_status.key).pending,
                        complete: 0 + caseStatus(crime_status.key).complete,
                        close: 0 + caseStatus(crime_status.key).close,
                        label: province.name,
                        key: province.key,
                        type: typeStatistic.region
                    }
                    const provinceNew = updatedArrayItem(provinceArray, data)
                    transaction.update(statisticMonthRef, {
                        provinces: provinceNew
                    })
                }
            } else {
                const data = {
                    value: 1,
                    pending: 0 + caseStatus(crime_status.key).pending,
                    complete: 0 + caseStatus(crime_status.key).complete,
                    close: 0 + caseStatus(crime_status.key).close,
                    label: province.name,
                    key: province.key,
                    type: typeStatistic.region
                }
                const provinceNew = updatedArrayItem(provinceArray, data)
                transaction.update(statisticMonthRef, {
                    provinces: provinceNew
                })
            }

            // CATEGORY
            if (categories && categories.length > 0) {
                const categoryStatistic = categoryArray.filter((m: { key: any; }) => m.key === category.key);

                if (categoryStatistic && categoryStatistic.length > 0) {
                    const { value, pending, complete, close } = categoryStatistic[0];
                    const data = {
                        value: value + 1,
                        pending: pending + caseStatus(crime_status.key).pending,
                        complete: complete + caseStatus(crime_status.key).complete,
                        close: close + caseStatus(crime_status.key).close,
                        label: category.name,
                        key: category.key,
                        type: typeStatistic.category
                    }
                    const categoryNew = updatedArrayItem(categoryArray, data)
                    transaction.update(statisticMonthRef, {
                        categories: categoryNew
                    })
                } else {
                    const data = {
                        value: 1,
                        pending: 0 + caseStatus(crime_status.key).pending,
                        complete: 0 + caseStatus(crime_status.key).complete,
                        close: 0 + caseStatus(crime_status.key).close,
                        label: category.name,
                        key: category.key,
                        type: typeStatistic.category
                    }
                    const categoryNew = updatedArrayItem(categoryArray, data)
                    transaction.update(statisticMonthRef, {
                        categories: categoryNew
                    })
                }

                const regionCategory = `${province.key}_category`;
                let regionCategoryDocs: any = statisticMonthData.data()[regionCategory];
                if (!regionCategoryDocs) regionCategoryDocs = [];
                if (regionCategoryDocs && regionCategoryDocs.length > 0) {
                    const regionCategoryStatistic = regionCategoryDocs.filter((m: { key: any; }) => m.key === category.key);

                    if (regionCategoryStatistic && regionCategoryStatistic.length > 0) {
                        const { value, pending, complete, close } = regionCategoryStatistic[0];
                        const dataCategory = {
                            value: value + 1,
                            pending: pending + caseStatus(crime_status.key).pending,
                            complete: complete + caseStatus(crime_status.key).complete,
                            close: close + caseStatus(crime_status.key).close,
                            label: category.name,
                            key: category.key,
                            type: typeStatistic.category
                        }
                        const regionCategoryNew = updatedArrayItem(regionCategoryDocs, dataCategory)
                        transaction.update(statisticMonthRef, {
                            [regionCategory]: regionCategoryNew
                        })
                    } else {
                        const dataCategory = {
                            value: 1,
                            pending: 0 + caseStatus(crime_status.key).pending,
                            complete: 0 + caseStatus(crime_status.key).complete,
                            close: 0 + caseStatus(crime_status.key).close,
                            label: category.name,
                            key: category.key,
                            type: typeStatistic.category
                        }
                        const regionCategoryNew = updatedArrayItem(regionCategoryDocs, dataCategory)
                        transaction.update(statisticMonthRef, {
                            [regionCategory]: regionCategoryNew
                        })
                    }

                } else {
                    const dataCategory = {
                        value: 1,
                        pending: 0 + caseStatus(crime_status.key).pending,
                        complete: 0 + caseStatus(crime_status.key).complete,
                        close: 0 + caseStatus(crime_status.key).close,
                        label: category.name,
                        key: category.key,
                        type: typeStatistic.category
                    }
                    const regionCategoryNew = updatedArrayItem(regionCategoryDocs, dataCategory)
                    transaction.update(statisticMonthRef, {
                        [regionCategory]: regionCategoryNew
                    })
                }

            } else {
                const data = {
                    value: 1,
                    pending: 0 + caseStatus(crime_status.key).pending,
                    complete: 0 + caseStatus(crime_status.key).complete,
                    close: 0 + caseStatus(crime_status.key).close,
                    label: category.name,
                    key: category.key,
                    type: typeStatistic.category
                }
                const categoryNew = updatedArrayItem(categoryArray, data)
                transaction.update(statisticMonthRef, {
                    categories: categoryNew
                })

                const regionCategory = `${province.key}_category`;
                let regionCategoryDocs: any = statisticMonthData.data()[regionCategory];
                if (!regionCategoryDocs) regionCategoryDocs = [];

                if (regionCategoryDocs && regionCategoryDocs.length > 0) {
                    const regionCategoryStatistic = regionCategoryDocs.filter((m: { key: any; }) => m.key === category.key);
                    if (regionCategoryStatistic && regionCategoryStatistic.length > 0) {
                        const { value, pending, complete, close } = regionCategoryStatistic[0];
                        const dataCategory = {
                            value: value + 1,
                            pending: pending + caseStatus(crime_status.key).pending,
                            complete: complete + caseStatus(crime_status.key).complete,
                            close: close + caseStatus(crime_status.key).close,
                            label: category.name,
                            key: category.key,
                            type: typeStatistic.category
                        }
                        const regionCategoryNew = updatedArrayItem(regionCategoryDocs, dataCategory)
                        transaction.update(statisticMonthRef, {
                            [regionCategory]: regionCategoryNew
                        })
                    } else {
                        const dataCategory = {
                            value: 1,
                            pending: 0 + caseStatus(crime_status.key).pending,
                            complete: 0 + caseStatus(crime_status.key).complete,
                            close: 0 + caseStatus(crime_status.key).close,
                            label: category.name,
                            key: category.key,
                            type: typeStatistic.category
                        }
                        const regionCategoryNew = updatedArrayItem(regionCategoryDocs, dataCategory)
                        transaction.update(statisticMonthRef, {
                            [regionCategory]: regionCategoryNew
                        })
                    }
                } else {
                    const dataCategory = {
                        value: 1,
                        pending: 0 + caseStatus(crime_status.key).pending,
                        complete: 0 + caseStatus(crime_status.key).complete,
                        close: 0 + caseStatus(crime_status.key).close,
                        label: category.name,
                        key: category.key,
                        type: typeStatistic.category
                    }
                    const regionCategoryNew = updatedArrayItem(regionCategoryDocs, dataCategory)
                    transaction.update(statisticMonthRef, {
                        [regionCategory]: regionCategoryNew
                    })
                }
            }

            // SUBCATEGORY
            if (sub_categories && sub_categories.length > 0) {
                const subCategoryStatistic = subCategoryArray.filter((m: { key: any; }) => m.key === sub_category.key);

                if (subCategoryStatistic && subCategoryStatistic.length > 0) {
                    const { value, pending, complete, close } = subCategoryStatistic[0];

                    const data = {
                        value: value + 1,
                        pending: pending + caseStatus(crime_status.key).pending,
                        complete: complete + caseStatus(crime_status.key).complete,
                        close: close + caseStatus(crime_status.key).close,
                        label: sub_category.name,
                        key: sub_category.key,
                        type: typeStatistic.subCategory
                    }
                    const subCategoryNew = updatedArrayItem(subCategoryArray, data)
                    transaction.update(statisticMonthRef, {
                        sub_categories: subCategoryNew
                    })
                } else {
                    const data = {
                        value: 1,
                        pending: 0 + caseStatus(crime_status.key).pending,
                        complete: 0 + caseStatus(crime_status.key).complete,
                        close: 0 + caseStatus(crime_status.key).close,
                        label: sub_category.name,
                        key: sub_category.key,
                        type: typeStatistic.subCategory
                    }
                    const subCategoryNew = updatedArrayItem(subCategoryArray, data)
                    transaction.update(statisticMonthRef, {
                        sub_categories: subCategoryNew
                    })
                }


                const regionSubCategory = `${province.key}_sub_category`;
                let regionSubCategoryDocs: any = statisticMonthData.data()[regionSubCategory];
                if (!regionSubCategoryDocs) regionSubCategoryDocs = [];

                if (regionSubCategoryDocs && regionSubCategoryDocs.length > 0) {
                    const regionSubCategoryStatistic = regionSubCategoryDocs.filter((m: { key: any; }) => m.key === sub_category.key);

                    if (regionSubCategoryStatistic && regionSubCategoryStatistic.length > 0) {
                        const { value, pending, complete, close } = regionSubCategoryStatistic[0];
                        const dataSubCategory = {
                            value: value + 1,
                            pending: pending + caseStatus(crime_status.key).pending,
                            complete: complete + caseStatus(crime_status.key).complete,
                            close: close + caseStatus(crime_status.key).close,
                            label: sub_category.name,
                            key: sub_category.key,
                            type: typeStatistic.subCategory
                        }
                        const regionSubCategoryNew = updatedArrayItem(regionSubCategoryDocs, dataSubCategory)
                        transaction.update(statisticMonthRef, {
                            [regionSubCategory]: regionSubCategoryNew
                        })
                    } else {
                        const dataSubCategory = {
                            value: 1,
                            pending: 0 + caseStatus(crime_status.key).pending,
                            complete: 0 + caseStatus(crime_status.key).complete,
                            close: 0 + caseStatus(crime_status.key).close,
                            label: sub_category.name,
                            key: sub_category.key,
                            type: typeStatistic.subCategory
                        }
                        const regionSubCategoryNew = updatedArrayItem(regionSubCategoryDocs, dataSubCategory)
                        transaction.update(statisticMonthRef, {
                            [regionSubCategory]: regionSubCategoryNew
                        })
                    }

                } else {
                    const dataSubCategory = {
                        value: 1,
                        pending: 0 + caseStatus(crime_status.key).pending,
                        complete: 0 + caseStatus(crime_status.key).complete,
                        close: 0 + caseStatus(crime_status.key).close,
                        label: sub_category.name,
                        key: sub_category.key,
                        type: typeStatistic.subCategory
                    }
                    const regionSubCategoryNew = updatedArrayItem(regionSubCategoryDocs, dataSubCategory)
                    transaction.update(statisticMonthRef, {
                        [regionSubCategory]: regionSubCategoryNew
                    })
                }

            } else {
                const data = {
                    value: 1,
                    pending: 0 + caseStatus(crime_status.key).pending,
                    complete: 0 + caseStatus(crime_status.key).complete,
                    close: 0 + caseStatus(crime_status.key).close,
                    label: sub_category.name,
                    key: sub_category.key,
                    type: typeStatistic.subCategory
                }
                const subCategoryNew = updatedArrayItem(subCategoryArray, data)
                transaction.update(statisticMonthRef, {
                    sub_categories: subCategoryNew
                })

                const regionSubCategory = `${province.key}_sub_category`;
                let regionSubCategoryDocs: any = statisticMonthData.data()[regionSubCategory];
                if (!regionSubCategoryDocs) regionSubCategoryDocs = [];

                if (regionSubCategoryDocs && regionSubCategoryDocs.length > 0) {
                    const regionSubCategoryStatistic = regionSubCategoryDocs.filter((m: { key: any; }) => m.key === sub_category.key);

                    if (regionSubCategoryStatistic && regionSubCategoryStatistic.length > 0) {
                        const { value, pending, complete, close } = regionSubCategoryStatistic[0];
                        const dataSubCategory = {
                            value: value + 1,
                            pending: pending + caseStatus(crime_status.key).pending,
                            complete: complete + caseStatus(crime_status.key).complete,
                            close: close + caseStatus(crime_status.key).close,
                            label: sub_category.name,
                            key: sub_category.key,
                            type: typeStatistic.subCategory
                        }
                        const regionSubCategoryNew = updatedArrayItem(regionSubCategoryDocs, dataSubCategory)
                        transaction.update(statisticMonthRef, {
                            [regionSubCategory]: regionSubCategoryNew
                        })
                    } else {
                        const dataSubCategory = {
                            value: 1,
                            pending: 0 + caseStatus(crime_status.key).pending,
                            complete: 0 + caseStatus(crime_status.key).complete,
                            close: 0 + caseStatus(crime_status.key).close,
                            label: sub_category.name,
                            key: sub_category.key,
                            type: typeStatistic.subCategory
                        }
                        const regionSubCategoryNew = updatedArrayItem(regionSubCategoryDocs, dataSubCategory)
                        transaction.update(statisticMonthRef, {
                            [regionSubCategory]: regionSubCategoryNew
                        })
                    }
                } else {
                    const dataSubCategory = {
                        value: 1,
                        pending: 0 + caseStatus(crime_status.key).pending,
                        complete: 0 + caseStatus(crime_status.key).complete,
                        close: 0 + caseStatus(crime_status.key).close,
                        label: sub_category.name,
                        key: sub_category.key,
                        type: typeStatistic.subCategory
                    }
                    const regionSubCategoryNew = updatedArrayItem(regionSubCategoryDocs, dataSubCategory)
                    transaction.update(statisticMonthRef, {
                        [regionSubCategory]: regionSubCategoryNew
                    })
                }
            }

        } else {

            const dataProvince = {
                value: 1,
                pending: 0 + caseStatus(crime_status.key).pending,
                complete: 0 + caseStatus(crime_status.key).complete,
                close: 0 + caseStatus(crime_status.key).close,
                label: province.name,
                key: province.key,
                type: typeStatistic.region
            }
            const provinceNew = updatedArrayItem(provinceArray, dataProvince)
            transaction.update(statisticMonthRef, {
                provinces: provinceNew
            })

            const regionCategory = `${province.key}_category`;
            let regionCategoryDocs: any = statisticMonthData.data()[regionCategory];
            if (!regionCategoryDocs) regionCategoryDocs = [];

            if (regionCategoryDocs && regionCategoryDocs.length > 0) {
                const regionCategoryStatistic = regionCategoryDocs.filter((m: { key: any; }) => m.key === category.key);
                if (regionCategoryStatistic && regionCategoryStatistic.length > 0) {
                    const { value, pending, complete, close } = regionCategoryStatistic[0];
                    const dataCategory2 = {
                        value: value + 1,
                        pending: pending + caseStatus(crime_status.key).pending,
                        complete: complete + caseStatus(crime_status.key).complete,
                        close: close + caseStatus(crime_status.key).close,
                        label: category.name,
                        key: category.key,
                        type: typeStatistic.category
                    }
                    const regionCategoryNew = updatedArrayItem(regionCategoryDocs, dataCategory2)
                    transaction.update(statisticMonthRef, {
                        [regionCategory]: regionCategoryNew
                    })
                } else {
                    const dataCategory3 = {
                        value: 1,
                        pending: 0 + caseStatus(crime_status.key).pending,
                        complete: 0 + caseStatus(crime_status.key).complete,
                        close: 0 + caseStatus(crime_status.key).close,
                        label: category.name,
                        key: category.key,
                        type: typeStatistic.category
                    }
                    const regionCategoryNew = updatedArrayItem(regionCategoryDocs, dataCategory3)
                    transaction.update(statisticMonthRef, {
                        [regionCategory]: regionCategoryNew
                    })
                }
            } else {
                const dataCategory1 = {
                    value: 1,
                    pending: 0 + caseStatus(crime_status.key).pending,
                    complete: 0 + caseStatus(crime_status.key).complete,
                    close: 0 + caseStatus(crime_status.key).close,
                    label: category.name,
                    key: category.key,
                    type: typeStatistic.category
                }
                const regionCategoryNew = updatedArrayItem(regionCategoryDocs, dataCategory1)
                transaction.update(statisticMonthRef, {
                    [regionCategory]: regionCategoryNew
                })
            }

            const dataCategory = {
                value: 1,
                pending: 0 + caseStatus(crime_status.key).pending,
                complete: 0 + caseStatus(crime_status.key).complete,
                close: 0 + caseStatus(crime_status.key).close,
                label: category.name,
                key: category.key,
                type: typeStatistic.category
            }
            const categoryNew = updatedArrayItem(categoryArray, dataCategory)
            transaction.update(statisticMonthRef, {
                categories: categoryNew
            })

            const dataSubCategory = {
                value: 1,
                pending: 0 + caseStatus(crime_status.key).pending,
                complete: 0 + caseStatus(crime_status.key).complete,
                close: 0 + caseStatus(crime_status.key).close,
                label: sub_category.name,
                key: sub_category.key,
                type: typeStatistic.subCategory
            }
            const subCategoryNew = updatedArrayItem(subCategoryArray, dataSubCategory)
            transaction.update(statisticMonthRef, {
                sub_categories: subCategoryNew
            })

            const regionSubCategory = `${province.key}_sub_category`;
            let regionSubCategoryDocs: any = statisticMonthData.data()[regionSubCategory];
            if (!regionSubCategoryDocs) regionSubCategoryDocs = [];

            if (regionSubCategoryDocs && regionSubCategoryDocs.length > 0) {
                const regionSubCategoryStatistic = regionSubCategoryDocs.filter((m: { key: any; }) => m.key === sub_category.key);
                if (regionSubCategoryStatistic && regionSubCategoryStatistic.length > 0) {
                    const { value, pending, complete, close } = regionSubCategoryStatistic[0];
                    const dataSubCategory1 = {
                        value: value + 1,
                        pending: pending + caseStatus(crime_status.key).pending,
                        complete: complete + caseStatus(crime_status.key).complete,
                        close: close + caseStatus(crime_status.key).close,
                        label: sub_category.name,
                        key: sub_category.key,
                        type: typeStatistic.subCategory
                    }
                    const regionSubCategoryNew = updatedArrayItem(regionSubCategoryDocs, dataSubCategory1)
                    transaction.update(statisticMonthRef, {
                        [regionSubCategory]: regionSubCategoryNew
                    })
                } else {
                    const dataSubCategory2 = {
                        value: 1,
                        pending: 0 + caseStatus(crime_status.key).pending,
                        complete: 0 + caseStatus(crime_status.key).complete,
                        close: 0 + caseStatus(crime_status.key).close,
                        label: sub_category.name,
                        key: sub_category.key,
                        type: typeStatistic.subCategory
                    }
                    const regionSubCategoryNew = updatedArrayItem(regionSubCategoryDocs, dataSubCategory2)
                    transaction.update(statisticMonthRef, {
                        [regionSubCategory]: regionSubCategoryNew
                    })
                }
            } else {
                const dataSubCategory3 = {
                    value: 1,
                    pending: 0 + caseStatus(crime_status.key).pending,
                    complete: 0 + caseStatus(crime_status.key).complete,
                    close: 0 + caseStatus(crime_status.key).close,
                    label: sub_category.name,
                    key: sub_category.key,
                    type: typeStatistic.subCategory
                }
                const regionSubCategoryNew = updatedArrayItem(regionSubCategoryDocs, dataSubCategory3)
                transaction.update(statisticMonthRef, {
                    [regionSubCategory]: regionSubCategoryNew
                })
            }
        }

    });
}

export function onEditCrimeStatistic(change: any, context: any) {
    const doc = change.after.data();
    const db = admin.firestore();
    const { category, sub_category, village, create_date_year, create_date_month, crime_status } = doc;
    const { province } = village;

    const statisticRef = db.collection("crime_statistic");
    const statisticYearRef = statisticRef.doc(create_date_year);
    const statisticMonthRef = statisticRef.doc(create_date_year).collection("month").doc(create_date_month);

    return db.runTransaction(async transaction => {

        const statisticYearData = await transaction.get(statisticYearRef);

        const statisticMonthData: any = await transaction.get(statisticMonthRef);

        if (!statisticYearData.exists) {

            //YEAR
            const yearData = {
                key: create_date_year,
            }
            transaction.set(statisticRef.doc(yearData.key), yearData);

            //MONTH
            for (let i = 1; i <= 12; i++) {
                let index = i.toString();
                if (index.length === 1) {
                    index = "0" + index;
                }
                const monthKey = create_date_year.toString() + index;
                const monthData = {
                    key: monthKey,
                }
                transaction.set(statisticRef.doc(yearData.key).collection("month").doc(monthData.key), monthData);
            }
        }

        const { provinces, categories, sub_categories } = statisticMonthData.data();
        let provinceArray: any = provinces ? provinces : [];
        let categoryArray: any = categories ? categories : [];
        let subCategoryArray: any = sub_categories ? sub_categories : [];
        // All PROVINCE CATEGORY SUBCATEGORY
        if (statisticMonthData.exists) {
            // REGION STATISTIC
            if (provinces && provinces.length > 0) {
                const regionStatistic = provinceArray.filter((m: { key: any; }) => m.key === province.key);
                if (regionStatistic && regionStatistic.length > 0) {
                    const { value, pending, complete, close } = regionStatistic[0];
                    const data = {
                        value: value + 1,
                        pending: pending + caseStatus(crime_status.key).pending,
                        complete: complete + caseStatus(crime_status.key).complete,
                        close: close + caseStatus(crime_status.key).close,
                        label: province.name,
                        key: province.key,
                        type: typeStatistic.region
                    }
                    const provinceNew = updatedArrayItem(provinceArray, data)
                    transaction.update(statisticMonthRef, {
                        provinces: provinceNew
                    })
                } else {
                    const data = {
                        value: 1,
                        pending: 0 + caseStatus(crime_status.key).pending,
                        complete: 0 + caseStatus(crime_status.key).complete,
                        close: 0 + caseStatus(crime_status.key).close,
                        label: province.name,
                        key: province.key,
                        type: typeStatistic.region
                    }
                    const provinceNew = updatedArrayItem(provinceArray, data)
                    transaction.update(statisticMonthRef, {
                        provinces: provinceNew
                    })
                }
            } else {
                const data = {
                    value: 1,
                    pending: 0 + caseStatus(crime_status.key).pending,
                    complete: 0 + caseStatus(crime_status.key).complete,
                    close: 0 + caseStatus(crime_status.key).close,
                    label: province.name,
                    key: province.key,
                    type: typeStatistic.region
                }
                const provinceNew = updatedArrayItem(provinceArray, data)
                transaction.update(statisticMonthRef, {
                    provinces: provinceNew
                })
            }

            // CATEGORY
            if (categories && categories.length > 0) {
                const categoryStatistic = categoryArray.filter((m: { key: any; }) => m.key === category.key);

                if (categoryStatistic && categoryStatistic.length > 0) {
                    const { value, pending, complete, close } = categoryStatistic[0];
                    const data = {
                        value: value + 1,
                        pending: pending + caseStatus(crime_status.key).pending,
                        complete: complete + caseStatus(crime_status.key).complete,
                        close: close + caseStatus(crime_status.key).close,
                        label: category.name,
                        key: category.key,
                        type: typeStatistic.category
                    }
                    const categoryNew = updatedArrayItem(categoryArray, data)
                    transaction.update(statisticMonthRef, {
                        categories: categoryNew
                    })
                } else {
                    const data = {
                        value: 1,
                        pending: 0 + caseStatus(crime_status.key).pending,
                        complete: 0 + caseStatus(crime_status.key).complete,
                        close: 0 + caseStatus(crime_status.key).close,
                        label: category.name,
                        key: category.key,
                        type: typeStatistic.category
                    }
                    const categoryNew = updatedArrayItem(categoryArray, data)
                    transaction.update(statisticMonthRef, {
                        categories: categoryNew
                    })
                }

                const regionCategory = `${province.key}_category`;
                let regionCategoryDocs: any = statisticMonthData.data()[regionCategory];
                if (!regionCategoryDocs) regionCategoryDocs = [];
                if (regionCategoryDocs && regionCategoryDocs.length > 0) {
                    const regionCategoryStatistic = regionCategoryDocs.filter((m: { key: any; }) => m.key === category.key);

                    if (regionCategoryStatistic && regionCategoryStatistic.length > 0) {
                        const { value, pending, complete, close } = regionCategoryStatistic[0];
                        const dataCategory = {
                            value: value + 1,
                            pending: pending + caseStatus(crime_status.key).pending,
                            complete: complete + caseStatus(crime_status.key).complete,
                            close: close + caseStatus(crime_status.key).close,
                            label: category.name,
                            key: category.key,
                            type: typeStatistic.category
                        }
                        const regionCategoryNew = updatedArrayItem(regionCategoryDocs, dataCategory)
                        transaction.update(statisticMonthRef, {
                            [regionCategory]: regionCategoryNew
                        })
                    } else {
                        const dataCategory = {
                            value: 1,
                            pending: 0 + caseStatus(crime_status.key).pending,
                            complete: 0 + caseStatus(crime_status.key).complete,
                            close: 0 + caseStatus(crime_status.key).close,
                            label: category.name,
                            key: category.key,
                            type: typeStatistic.category
                        }
                        const regionCategoryNew = updatedArrayItem(regionCategoryDocs, dataCategory)
                        transaction.update(statisticMonthRef, {
                            [regionCategory]: regionCategoryNew
                        })
                    }

                } else {
                    const dataCategory = {
                        value: 1,
                        pending: 0 + caseStatus(crime_status.key).pending,
                        complete: 0 + caseStatus(crime_status.key).complete,
                        close: 0 + caseStatus(crime_status.key).close,
                        label: category.name,
                        key: category.key,
                        type: typeStatistic.category
                    }
                    const regionCategoryNew = updatedArrayItem(regionCategoryDocs, dataCategory)
                    transaction.update(statisticMonthRef, {
                        [regionCategory]: regionCategoryNew
                    })
                }

            } else {
                const data = {
                    value: 1,
                    pending: 0 + caseStatus(crime_status.key).pending,
                    complete: 0 + caseStatus(crime_status.key).complete,
                    close: 0 + caseStatus(crime_status.key).close,
                    label: category.name,
                    key: category.key,
                    type: typeStatistic.category
                }
                const categoryNew = updatedArrayItem(categoryArray, data)
                transaction.update(statisticMonthRef, {
                    categories: categoryNew
                })

                const regionCategory = `${province.key}_category`;
                let regionCategoryDocs: any = statisticMonthData.data()[regionCategory];
                if (!regionCategoryDocs) regionCategoryDocs = [];

                if (regionCategoryDocs && regionCategoryDocs.length > 0) {
                    const regionCategoryStatistic = regionCategoryDocs.filter((m: { key: any; }) => m.key === category.key);
                    if (regionCategoryStatistic && regionCategoryStatistic.length > 0) {
                        const { value, pending, complete, close } = regionCategoryStatistic[0];
                        const dataCategory = {
                            value: value + 1,
                            pending: pending + caseStatus(crime_status.key).pending,
                            complete: complete + caseStatus(crime_status.key).complete,
                            close: close + caseStatus(crime_status.key).close,
                            label: category.name,
                            key: category.key,
                            type: typeStatistic.category
                        }
                        const regionCategoryNew = updatedArrayItem(regionCategoryDocs, dataCategory)
                        transaction.update(statisticMonthRef, {
                            [regionCategory]: regionCategoryNew
                        })
                    } else {
                        const dataCategory = {
                            value: 1,
                            pending: 0 + caseStatus(crime_status.key).pending,
                            complete: 0 + caseStatus(crime_status.key).complete,
                            close: 0 + caseStatus(crime_status.key).close,
                            label: category.name,
                            key: category.key,
                            type: typeStatistic.category
                        }
                        const regionCategoryNew = updatedArrayItem(regionCategoryDocs, dataCategory)
                        transaction.update(statisticMonthRef, {
                            [regionCategory]: regionCategoryNew
                        })
                    }
                } else {
                    const dataCategory = {
                        value: 1,
                        pending: 0 + caseStatus(crime_status.key).pending,
                        complete: 0 + caseStatus(crime_status.key).complete,
                        close: 0 + caseStatus(crime_status.key).close,
                        label: category.name,
                        key: category.key,
                        type: typeStatistic.category
                    }
                    const regionCategoryNew = updatedArrayItem(regionCategoryDocs, dataCategory)
                    transaction.update(statisticMonthRef, {
                        [regionCategory]: regionCategoryNew
                    })
                }
            }

            // SUBCATEGORY
            if (sub_categories && sub_categories.length > 0) {
                const subCategoryStatistic = subCategoryArray.filter((m: { key: any; }) => m.key === sub_category.key);

                if (subCategoryStatistic && subCategoryStatistic.length > 0) {
                    const { value, pending, complete, close } = subCategoryStatistic[0];

                    const data = {
                        value: value + 1,
                        pending: pending + caseStatus(crime_status.key).pending,
                        complete: complete + caseStatus(crime_status.key).complete,
                        close: close + caseStatus(crime_status.key).close,
                        label: sub_category.name,
                        key: sub_category.key,
                        type: typeStatistic.subCategory
                    }
                    const subCategoryNew = updatedArrayItem(subCategoryArray, data)
                    transaction.update(statisticMonthRef, {
                        sub_categories: subCategoryNew
                    })
                } else {
                    const data = {
                        value: 1,
                        pending: 0 + caseStatus(crime_status.key).pending,
                        complete: 0 + caseStatus(crime_status.key).complete,
                        close: 0 + caseStatus(crime_status.key).close,
                        label: sub_category.name,
                        key: sub_category.key,
                        type: typeStatistic.subCategory
                    }
                    const subCategoryNew = updatedArrayItem(subCategoryArray, data)
                    transaction.update(statisticMonthRef, {
                        sub_categories: subCategoryNew
                    })
                }


                const regionSubCategory = `${province.key}_sub_category`;
                let regionSubCategoryDocs: any = statisticMonthData.data()[regionSubCategory];
                if (!regionSubCategoryDocs) regionSubCategoryDocs = [];

                if (regionSubCategoryDocs && regionSubCategoryDocs.length > 0) {
                    const regionSubCategoryStatistic = regionSubCategoryDocs.filter((m: { key: any; }) => m.key === sub_category.key);

                    if (regionSubCategoryStatistic && regionSubCategoryStatistic.length > 0) {
                        const { value, pending, complete, close } = regionSubCategoryStatistic[0];
                        const dataSubCategory = {
                            value: value + 1,
                            pending: pending + caseStatus(crime_status.key).pending,
                            complete: complete + caseStatus(crime_status.key).complete,
                            close: close + caseStatus(crime_status.key).close,
                            label: sub_category.name,
                            key: sub_category.key,
                            type: typeStatistic.subCategory
                        }
                        const regionSubCategoryNew = updatedArrayItem(regionSubCategoryDocs, dataSubCategory)
                        transaction.update(statisticMonthRef, {
                            [regionSubCategory]: regionSubCategoryNew
                        })
                    } else {
                        const dataSubCategory = {
                            value: 1,
                            pending: 0 + caseStatus(crime_status.key).pending,
                            complete: 0 + caseStatus(crime_status.key).complete,
                            close: 0 + caseStatus(crime_status.key).close,
                            label: sub_category.name,
                            key: sub_category.key,
                            type: typeStatistic.subCategory
                        }
                        const regionSubCategoryNew = updatedArrayItem(regionSubCategoryDocs, dataSubCategory)
                        transaction.update(statisticMonthRef, {
                            [regionSubCategory]: regionSubCategoryNew
                        })
                    }

                } else {
                    const dataSubCategory = {
                        value: 1,
                        pending: 0 + caseStatus(crime_status.key).pending,
                        complete: 0 + caseStatus(crime_status.key).complete,
                        close: 0 + caseStatus(crime_status.key).close,
                        label: sub_category.name,
                        key: sub_category.key,
                        type: typeStatistic.subCategory
                    }
                    const regionSubCategoryNew = updatedArrayItem(regionSubCategoryDocs, dataSubCategory)
                    transaction.update(statisticMonthRef, {
                        [regionSubCategory]: regionSubCategoryNew
                    })
                }

            } else {
                const data = {
                    value: 1,
                    pending: 0 + caseStatus(crime_status.key).pending,
                    complete: 0 + caseStatus(crime_status.key).complete,
                    close: 0 + caseStatus(crime_status.key).close,
                    label: sub_category.name,
                    key: sub_category.key,
                    type: typeStatistic.subCategory
                }
                const subCategoryNew = updatedArrayItem(subCategoryArray, data)
                transaction.update(statisticMonthRef, {
                    sub_categories: subCategoryNew
                })

                const regionSubCategory = `${province.key}_sub_category`;
                let regionSubCategoryDocs: any = statisticMonthData.data()[regionSubCategory];
                if (!regionSubCategoryDocs) regionSubCategoryDocs = [];

                if (regionSubCategoryDocs && regionSubCategoryDocs.length > 0) {
                    const regionSubCategoryStatistic = regionSubCategoryDocs.filter((m: { key: any; }) => m.key === sub_category.key);

                    if (regionSubCategoryStatistic && regionSubCategoryStatistic.length > 0) {
                        const { value, pending, complete, close } = regionSubCategoryStatistic[0];
                        const dataSubCategory = {
                            value: value + 1,
                            pending: pending + caseStatus(crime_status.key).pending,
                            complete: complete + caseStatus(crime_status.key).complete,
                            close: close + caseStatus(crime_status.key).close,
                            label: sub_category.name,
                            key: sub_category.key,
                            type: typeStatistic.subCategory
                        }
                        const regionSubCategoryNew = updatedArrayItem(regionSubCategoryDocs, dataSubCategory)
                        transaction.update(statisticMonthRef, {
                            [regionSubCategory]: regionSubCategoryNew
                        })
                    } else {
                        const dataSubCategory = {
                            value: 1,
                            pending: 0 + caseStatus(crime_status.key).pending,
                            complete: 0 + caseStatus(crime_status.key).complete,
                            close: 0 + caseStatus(crime_status.key).close,
                            label: sub_category.name,
                            key: sub_category.key,
                            type: typeStatistic.subCategory
                        }
                        const regionSubCategoryNew = updatedArrayItem(regionSubCategoryDocs, dataSubCategory)
                        transaction.update(statisticMonthRef, {
                            [regionSubCategory]: regionSubCategoryNew
                        })
                    }
                } else {
                    const dataSubCategory = {
                        value: 1,
                        pending: 0 + caseStatus(crime_status.key).pending,
                        complete: 0 + caseStatus(crime_status.key).complete,
                        close: 0 + caseStatus(crime_status.key).close,
                        label: sub_category.name,
                        key: sub_category.key,
                        type: typeStatistic.subCategory
                    }
                    const regionSubCategoryNew = updatedArrayItem(regionSubCategoryDocs, dataSubCategory)
                    transaction.update(statisticMonthRef, {
                        [regionSubCategory]: regionSubCategoryNew
                    })
                }
            }

        } else {

            const dataProvince = {
                value: 1,
                pending: 0 + caseStatus(crime_status.key).pending,
                complete: 0 + caseStatus(crime_status.key).complete,
                close: 0 + caseStatus(crime_status.key).close,
                label: province.name,
                key: province.key,
                type: typeStatistic.region
            }
            const provinceNew = updatedArrayItem(provinceArray, dataProvince)
            transaction.update(statisticMonthRef, {
                provinces: provinceNew
            })

            const regionCategory = `${province.key}_category`;
            let regionCategoryDocs: any = statisticMonthData.data()[regionCategory];
            if (!regionCategoryDocs) regionCategoryDocs = [];

            if (regionCategoryDocs && regionCategoryDocs.length > 0) {
                const regionCategoryStatistic = regionCategoryDocs.filter((m: { key: any; }) => m.key === category.key);
                if (regionCategoryStatistic && regionCategoryStatistic.length > 0) {
                    const { value, pending, complete, close } = regionCategoryStatistic[0];
                    const dataCategory2 = {
                        value: value + 1,
                        pending: pending + caseStatus(crime_status.key).pending,
                        complete: complete + caseStatus(crime_status.key).complete,
                        close: close + caseStatus(crime_status.key).close,
                        label: category.name,
                        key: category.key,
                        type: typeStatistic.category
                    }
                    const regionCategoryNew = updatedArrayItem(regionCategoryDocs, dataCategory2)
                    transaction.update(statisticMonthRef, {
                        [regionCategory]: regionCategoryNew
                    })
                } else {
                    const dataCategory3 = {
                        value: 1,
                        pending: 0 + caseStatus(crime_status.key).pending,
                        complete: 0 + caseStatus(crime_status.key).complete,
                        close: 0 + caseStatus(crime_status.key).close,
                        label: category.name,
                        key: category.key,
                        type: typeStatistic.category
                    }
                    const regionCategoryNew = updatedArrayItem(regionCategoryDocs, dataCategory3)
                    transaction.update(statisticMonthRef, {
                        [regionCategory]: regionCategoryNew
                    })
                }
            } else {
                const dataCategory1 = {
                    value: 1,
                    pending: 0 + caseStatus(crime_status.key).pending,
                    complete: 0 + caseStatus(crime_status.key).complete,
                    close: 0 + caseStatus(crime_status.key).close,
                    label: category.name,
                    key: category.key,
                    type: typeStatistic.category
                }
                const regionCategoryNew = updatedArrayItem(regionCategoryDocs, dataCategory1)
                transaction.update(statisticMonthRef, {
                    [regionCategory]: regionCategoryNew
                })
            }

            const dataCategory = {
                value: 1,
                pending: 0 + caseStatus(crime_status.key).pending,
                complete: 0 + caseStatus(crime_status.key).complete,
                close: 0 + caseStatus(crime_status.key).close,
                label: category.name,
                key: category.key,
                type: typeStatistic.category
            }
            const categoryNew = updatedArrayItem(categoryArray, dataCategory)
            transaction.update(statisticMonthRef, {
                categories: categoryNew
            })

            const dataSubCategory = {
                value: 1,
                pending: 0 + caseStatus(crime_status.key).pending,
                complete: 0 + caseStatus(crime_status.key).complete,
                close: 0 + caseStatus(crime_status.key).close,
                label: sub_category.name,
                key: sub_category.key,
                type: typeStatistic.subCategory
            }
            const subCategoryNew = updatedArrayItem(subCategoryArray, dataSubCategory)
            transaction.update(statisticMonthRef, {
                sub_categories: subCategoryNew
            })

            const regionSubCategory = `${province.key}_sub_category`;
            let regionSubCategoryDocs: any = statisticMonthData.data()[regionSubCategory];
            if (!regionSubCategoryDocs) regionSubCategoryDocs = [];

            if (regionSubCategoryDocs && regionSubCategoryDocs.length > 0) {
                const regionSubCategoryStatistic = regionSubCategoryDocs.filter((m: { key: any; }) => m.key === sub_category.key);
                if (regionSubCategoryStatistic && regionSubCategoryStatistic.length > 0) {
                    const { value, pending, complete, close } = regionSubCategoryStatistic[0];
                    const dataSubCategory1 = {
                        value: value + 1,
                        pending: pending + caseStatus(crime_status.key).pending,
                        complete: complete + caseStatus(crime_status.key).complete,
                        close: close + caseStatus(crime_status.key).close,
                        label: sub_category.name,
                        key: sub_category.key,
                        type: typeStatistic.subCategory
                    }
                    const regionSubCategoryNew = updatedArrayItem(regionSubCategoryDocs, dataSubCategory1)
                    transaction.update(statisticMonthRef, {
                        [regionSubCategory]: regionSubCategoryNew
                    })
                } else {
                    const dataSubCategory2 = {
                        value: 1,
                        pending: 0 + caseStatus(crime_status.key).pending,
                        complete: 0 + caseStatus(crime_status.key).complete,
                        close: 0 + caseStatus(crime_status.key).close,
                        label: sub_category.name,
                        key: sub_category.key,
                        type: typeStatistic.subCategory
                    }
                    const regionSubCategoryNew = updatedArrayItem(regionSubCategoryDocs, dataSubCategory2)
                    transaction.update(statisticMonthRef, {
                        [regionSubCategory]: regionSubCategoryNew
                    })
                }
            } else {
                const dataSubCategory3 = {
                    value: 1,
                    pending: 0 + caseStatus(crime_status.key).pending,
                    complete: 0 + caseStatus(crime_status.key).complete,
                    close: 0 + caseStatus(crime_status.key).close,
                    label: sub_category.name,
                    key: sub_category.key,
                    type: typeStatistic.subCategory
                }
                const regionSubCategoryNew = updatedArrayItem(regionSubCategoryDocs, dataSubCategory3)
                transaction.update(statisticMonthRef, {
                    [regionSubCategory]: regionSubCategoryNew
                })
            }
        }

    });
}

export function onDeleteCrimeStatistic(change: any, context: any) {
    const doc = change.data();
    const db = admin.firestore();
    const { category, sub_category, village, create_date_year, create_date_month, crime_status } = doc;
    const { province } = village;
    const statisticRef = db.collection("crime_statistic");
    const statisticMonthRef = statisticRef.doc(create_date_year).collection("month").doc(create_date_month);

    return db.runTransaction(async transaction => {
        const statisticMonthData: any = await transaction.get(statisticMonthRef);

        const { provinces, categories, sub_categories } = statisticMonthData.data();
        let provinceArray: any = provinces ? provinces : [];
        let categoryArray: any = categories ? categories : [];
        let subCategoryArray: any = sub_categories ? sub_categories : [];

        // All PROVINCE CATEGORY SUBCATEGORY
        if (statisticMonthData.exists) {
            // REGION STATISTIC
            if (provinces && provinces.length > 0) {
                const regionStatistic = provinceArray.filter((m: { key: any; }) => m.key === province.key);
                if (regionStatistic && regionStatistic.length > 0) {
                    const { value, pending, complete, close } = regionStatistic[0];
                    const data = {
                        value: value - 1,
                        pending: pending - caseStatus(crime_status.key).pending,
                        complete: complete - caseStatus(crime_status.key).complete,
                        close: close - caseStatus(crime_status.key).close,
                        label: province.name,
                        key: province.key,
                        type: typeStatistic.region
                    }
                    const provinceNew = updatedArrayItem(provinceArray, data)
                    transaction.update(statisticMonthRef, {
                        provinces: provinceNew
                    })
                }
            }

            // CATEGORY
            if (categories && categories.length > 0) {
                const categoryStatistic = categoryArray.filter((m: { key: any; }) => m.key === category.key);

                if (categoryStatistic && categoryStatistic.length > 0) {
                    const { value, pending, complete, close } = categoryStatistic[0];
                    const data = {
                        value: value - 1,
                        pending: pending - caseStatus(crime_status.key).pending,
                        complete: complete - caseStatus(crime_status.key).complete,
                        close: close - caseStatus(crime_status.key).close,
                        label: category.name,
                        key: category.key,
                        type: typeStatistic.category
                    }
                    const categoryNew = updatedArrayItem(categoryArray, data)
                    transaction.update(statisticMonthRef, {
                        categories: categoryNew
                    })
                }

                const regionCategory = `${province.key}_category`;
                let regionCategoryDocs: any = statisticMonthData.data()[regionCategory];
                if (!regionCategoryDocs) regionCategoryDocs = [];
                if (regionCategoryDocs && regionCategoryDocs.length > 0) {
                    const regionCategoryStatistic = regionCategoryDocs.filter((m: { key: any; }) => m.key === category.key);

                    if (regionCategoryStatistic && regionCategoryStatistic.length > 0) {
                        const { value, pending, complete, close } = regionCategoryStatistic[0];
                        const dataCategory = {
                            value: value - 1,
                            pending: pending - caseStatus(crime_status.key).pending,
                            complete: complete - caseStatus(crime_status.key).complete,
                            close: close - caseStatus(crime_status.key).close,
                            label: category.name,
                            key: category.key,
                            type: typeStatistic.category
                        }
                        const regionCategoryNew = updatedArrayItem(regionCategoryDocs, dataCategory)
                        transaction.update(statisticMonthRef, {
                            [regionCategory]: regionCategoryNew
                        })
                    }

                }

            } else {

                const regionCategory = `${province.key}_category`;
                let regionCategoryDocs: any = statisticMonthData.data()[regionCategory];
                if (!regionCategoryDocs) regionCategoryDocs = [];

                if (regionCategoryDocs && regionCategoryDocs.length > 0) {
                    const regionCategoryStatistic = regionCategoryDocs.filter((m: { key: any; }) => m.key === category.key);
                    if (regionCategoryStatistic && regionCategoryStatistic.length > 0) {
                        const { value, pending, complete, close } = regionCategoryStatistic[0];
                        const dataCategory = {
                            value: value - 1,
                            pending: pending - caseStatus(crime_status.key).pending,
                            complete: complete - caseStatus(crime_status.key).complete,
                            close: close - caseStatus(crime_status.key).close,
                            label: category.name,
                            key: category.key,
                            type: typeStatistic.category
                        }
                        const regionCategoryNew = updatedArrayItem(regionCategoryDocs, dataCategory)
                        transaction.update(statisticMonthRef, {
                            [regionCategory]: regionCategoryNew
                        })
                    }
                }
            }

            // SUBCATEGORY
            if (sub_categories && sub_categories.length > 0) {
                const subCategoryStatistic = subCategoryArray.filter((m: { key: any; }) => m.key === sub_category.key);

                if (subCategoryStatistic && subCategoryStatistic.length > 0) {
                    const { value, pending, complete, close } = subCategoryStatistic[0];

                    const data = {
                        value: value - 1,
                        pending: pending - caseStatus(crime_status.key).pending,
                        complete: complete - caseStatus(crime_status.key).complete,
                        close: close - caseStatus(crime_status.key).close,
                        label: sub_category.name,
                        key: sub_category.key,
                        type: typeStatistic.subCategory
                    }
                    const subCategoryNew = updatedArrayItem(subCategoryArray, data)
                    transaction.update(statisticMonthRef, {
                        sub_categories: subCategoryNew
                    })
                }

                const regionSubCategory = `${province.key}_sub_category`;
                let regionSubCategoryDocs: any = statisticMonthData.data()[regionSubCategory];
                if (!regionSubCategoryDocs) regionSubCategoryDocs = [];

                if (regionSubCategoryDocs && regionSubCategoryDocs.length > 0) {
                    const regionSubCategoryStatistic = regionSubCategoryDocs.filter((m: { key: any; }) => m.key === sub_category.key);

                    if (regionSubCategoryStatistic && regionSubCategoryStatistic.length > 0) {
                        const { value, pending, complete, close } = regionSubCategoryStatistic[0];
                        const dataSubCategory = {
                            value: value - 1,
                            pending: pending - caseStatus(crime_status.key).pending,
                            complete: complete - caseStatus(crime_status.key).complete,
                            close: close - caseStatus(crime_status.key).close,
                            label: sub_category.name,
                            key: sub_category.key,
                            type: typeStatistic.subCategory
                        }
                        const regionSubCategoryNew = updatedArrayItem(regionSubCategoryDocs, dataSubCategory)
                        transaction.update(statisticMonthRef, {
                            [regionSubCategory]: regionSubCategoryNew
                        })
                    }
                }

            } else {
                const regionSubCategory = `${province.key}_sub_category`;
                let regionSubCategoryDocs: any = statisticMonthData.data()[regionSubCategory];
                if (!regionSubCategoryDocs) regionSubCategoryDocs = [];

                if (regionSubCategoryDocs && regionSubCategoryDocs.length > 0) {
                    const regionSubCategoryStatistic = regionSubCategoryDocs.filter((m: { key: any; }) => m.key === sub_category.key);

                    if (regionSubCategoryStatistic && regionSubCategoryStatistic.length > 0) {
                        const { value, pending, complete, close } = regionSubCategoryStatistic[0];
                        const dataSubCategory = {
                            value: value - 1,
                            pending: pending - caseStatus(crime_status.key).pending,
                            complete: complete - caseStatus(crime_status.key).complete,
                            close: close - caseStatus(crime_status.key).close,
                            label: sub_category.name,
                            key: sub_category.key,
                            type: typeStatistic.subCategory
                        }
                        const regionSubCategoryNew = updatedArrayItem(regionSubCategoryDocs, dataSubCategory)
                        transaction.update(statisticMonthRef, {
                            [regionSubCategory]: regionSubCategoryNew
                        })
                    }
                }
            }
        } else {

            const regionCategory = `${province.key}_category`;
            let regionCategoryDocs: any = statisticMonthData.data()[regionCategory];
            if (!regionCategoryDocs) regionCategoryDocs = [];

            if (regionCategoryDocs && regionCategoryDocs.length > 0) {
                const regionCategoryStatistic = regionCategoryDocs.filter((m: { key: any; }) => m.key === category.key);
                if (regionCategoryStatistic && regionCategoryStatistic.length > 0) {
                    const { value, pending, complete, close } = regionCategoryStatistic[0];
                    const dataCategory2 = {
                        value: value - 1,
                        pending: pending - caseStatus(crime_status.key).pending,
                        complete: complete - caseStatus(crime_status.key).complete,
                        close: close - caseStatus(crime_status.key).close,
                        label: category.name,
                        key: category.key,
                        type: typeStatistic.category
                    }
                    const regionCategoryNew = updatedArrayItem(regionCategoryDocs, dataCategory2)
                    transaction.update(statisticMonthRef, {
                        [regionCategory]: regionCategoryNew
                    })
                }
            }

            const regionSubCategory = `${province.key}_sub_category`;
            let regionSubCategoryDocs: any = statisticMonthData.data()[regionSubCategory];
            if (!regionSubCategoryDocs) regionSubCategoryDocs = [];

            if (regionSubCategoryDocs && regionSubCategoryDocs.length > 0) {
                const regionSubCategoryStatistic = regionSubCategoryDocs.filter((m: { key: any; }) => m.key === sub_category.key);
                if (regionSubCategoryStatistic && regionSubCategoryStatistic.length > 0) {
                    const { value, pending, complete, close } = regionSubCategoryStatistic[0];
                    const dataSubCategory1 = {
                        value: value - 1,
                        pending: pending - caseStatus(crime_status.key).pending,
                        complete: complete - caseStatus(crime_status.key).complete,
                        close: close - caseStatus(crime_status.key).close,
                        label: sub_category.name,
                        key: sub_category.key,
                        type: typeStatistic.subCategory
                    }
                    const regionSubCategoryNew = updatedArrayItem(regionSubCategoryDocs, dataSubCategory1)
                    transaction.update(statisticMonthRef, {
                        [regionSubCategory]: regionSubCategoryNew
                    })
                }
            }
        }

    });
}

export function onAddPersonCrimeStatistic(change: any, context: any) {
    const doc = change.data();
    const db = admin.firestore();
    const { crimeRef, age, person_type } = doc;

    const crimeDocRef = db.collection("crime").doc(crimeRef);
    const statisticRef = db.collection("crime_statistic");

    return db.runTransaction(async transaction => {

        const crimeData = await transaction.get(crimeDocRef);
        const crime: any = crimeData.exists ? crimeData.data() : null;
        const { village, create_date_year, create_date_month } = crime;
        const { province } = village;

        const statisticMonthRef = statisticRef.doc(create_date_year).collection("month").doc(create_date_month).collection("statistic");

        const statisticData = await transaction.get(statisticMonthRef);
        const statisticArray = statisticData.empty ? [] : statisticData.docs.map(m => ({ ...m.data() }));

        const statisticProvinceData = await transaction.get(statisticMonthRef.doc(province.key).collection("province"));
        const statisticProvinceArray = statisticProvinceData.empty ? [] : statisticProvinceData.docs.map(m => ({ ...m.data() }));


        let year: any = null;
        let label: string = "";

        if (age < 14) {
            year = 14;
            label = "<14ឆ្នាំ";
        } else if (age >= 14 && age < 18) {
            year = 16;
            label = ">=14ឆ្នាំ និង <18ឆ្នាំ";
        } else {
            year = 18;
            label = ">=18ឆ្នាំ";
        }
        const yearString = year;
        const victimKey = `${yearString}_victim`;
        const suspectKey = `${yearString}_suspect`;
        let statisticKey: string = "";
        let statisticType: any;
        if (person_type.key === personTypeObj.victim.key) {
            statisticKey = victimKey;
            statisticType = typeStatistic.victim;
        } else if (person_type.key === personTypeObj.suspect.key) {
            statisticKey = suspectKey;
            statisticType = typeStatistic.suspect;
        } else {
            statisticKey = victimKey;
            statisticType = typeStatistic.victim;
        }

        // All STATISTIC BY AGE
        if (!statisticData.empty) {

            // STATISTIC
            const statistic = statisticArray.filter(m => m.type.key === statisticType.key && m.key === statisticKey);
            if (statistic && statistic.length > 0) {
                const { value } = statistic[0];
                transaction.update(statisticMonthRef.doc(statisticKey), {
                    value: value + 1
                })
            } else {
                transaction.set(statisticMonthRef.doc(statisticKey), {
                    value: 1,
                    label: label,
                    key: statisticKey,
                    type: statisticType
                })
            }

        } else {

            transaction.set(statisticMonthRef.doc(statisticKey), {
                value: 1,
                label: label,
                key: statisticKey,
                type: statisticType
            })
        }

        // BY PROVINCE VICTIM SUSPECT
        if (!statisticProvinceData.empty) {

            // STATISTIC
            const statistic = statisticProvinceArray.filter(m => m.type.key === statisticType.key && m.key === statisticKey);
            if (statistic && statistic.length > 0) {
                const { value } = statistic[0];
                transaction.update(statisticMonthRef.doc(province.key).collection("province").doc(statisticKey), {
                    value: value + 1
                })
            } else {
                transaction.set(statisticMonthRef.doc(province.key).collection("province").doc(statisticKey), {
                    value: 1,
                    label: label,
                    key: statisticKey,
                    type: statisticType
                })
            }

        } else {

            transaction.set(statisticMonthRef.doc(province.key).collection("province").doc(statisticKey), {
                value: 1,
                label: label,
                key: statisticKey,
                type: statisticType
            })

        }

    });
}
